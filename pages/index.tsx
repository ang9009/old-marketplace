import React from "react";
import { ToastContainer } from "react-toastify";

import SignupContainer from "../components/ui/SignupContainer";
import useGetUser from "../hooks/useGetUser";
import useCompletedSignupRedirect from "../hooks/useCompletedSignupRedirect";
import useSignIn from "../hooks/useSignIn";
import { FcGoogle } from "react-icons/fc";

const SignInPage: React.FC = () => {
  useCompletedSignupRedirect();
  const signIn = useSignIn();

  return (
    <>
      <SignupContainer>
        <div className="content">
          <h1>CIS Marketplace</h1>
          <button onClick={signIn}>
            <FcGoogle />
            <span>Continue with Google</span>
          </button>
        </div>
        <ToastContainer />
      </SignupContainer>

      <style jsx>{`
        button {
          margin-top: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 15px;
          border: 1px solid var(--primaryBorderColor);
          background: var(--primaryBackgroundColor);
          font-weight: 700;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
        }

        button span {
          margin-left: 10px;
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
