import React, { useContext } from "react";
import { UserContext } from "../components/context/UserContext";
import SignupContainer from "../components/ui/SignupContainer";
import { provider } from "../config/firebase.config";
import { signInWithPopup, getAdditionalUserInfo, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import useRedirectWhenLoggedIn from "../hooks/useRedirectWhenLoggedIn";
import baseUser from "../types/baseUser.interface";

const SignInPage: React.FC = () => {
  // useRedirectWhenLoggedIn();
  const router = useRouter();

  const { setUser } = useContext(UserContext);

  const signIn = () => {
    signInWithPopup(getAuth(), provider)
      .then(async (result) => {
        const additionalInfo = getAdditionalUserInfo(result);
        const authUser = result.user;

        if (!authUser.email.endsWith("cis.edu.hk")) {
          toast.error("You are not a CIS student!", {
            autoClose: 3000,
          });
          return;
        }

        if (additionalInfo.isNewUser) {
          const incompleteUser: baseUser = {
            email: authUser.email,
            name: authUser.displayName,
            id: authUser.uid,
            hasCompletedSignup: false,
          };

          setUser(incompleteUser);
          await router.push("/complete-signup");
        } else {
          await router.push("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <SignupContainer>
        <div className="content">
          <h1>CIS Marketplace</h1>
          <button onClick={signIn}>Continue with Google</button>
        </div>
        <ToastContainer />
      </SignupContainer>

      <style jsx>{`
        button {
          margin-top: 10px;
          padding: 15px;
          border: 2px solid var(--buttonBorderColor);
          background: var(--primaryBackgroundColor);
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
        }

        button:hover {
          background: var(--secondaryBackgroundColor);
        }

        .content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min-content;
        }

        .content h1 {
          white-space: nowrap;
          color: var(--primaryColor);
        }
      `}</style>
    </>
  );
};

export default SignInPage;
