import React, { useContext, useEffect } from "react";
import SignupContainer from "../components/ui/SignupContainer";
import { provider } from "../config/firebase.config";
import { signInWithPopup, getAdditionalUserInfo, getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import useRedirectWhenLoggedIn from "../hooks/useRedirectWhenLoggedIn";
import baseUser from "../types/baseUser.interface";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import useGetUser from "../hooks/useGetUser";
import useCompletedSignupRedirect from "../hooks/useCompletedSignupRedirect";
import useSignIn from "../hooks/useSignIn";

const SignInPage: React.FC = () => {
  const userDocSnap = useGetUser();
  useCompletedSignupRedirect(userDocSnap);
  const signIn = useSignIn();

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
