import React, { useContext } from "react";
import { UserContext } from "../components/context/UserContext";
import SignupContainer from "../components/ui/SignupContainer";
import { provider } from "../config/firebase.config";
import { signInWithPopup, getAdditionalUserInfo, getAuth } from "firebase/auth";
import { useRouter } from "next/router";

const SignInPage: React.FC = () => {
  const router = useRouter();

  const { setUser } = useContext(UserContext);

  const signIn = () => {
    signInWithPopup(getAuth(), provider)
      .then(async (result) => {
        const additionalInfo = getAdditionalUserInfo(result);

        if (additionalInfo.isNewUser) {
          const user = result.user;
          setUser({ name: user.displayName, id: user.uid, email: user.email });
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
      </SignupContainer>

      <style jsx>{`
        button {
          margin-top: 10px;
          padding: 15px;
          background: var(--primaryBackgroundColor);
          border: 2px solid var(--secondaryBackgroundColor);
          color: #626262;
          cursor: pointer;
          width: 100%;
        }

        button:hover {
          background: var(--secondaryBackgroundColor);
          transition: all 0.2s;
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
