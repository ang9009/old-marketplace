import React, { useContext } from "react";
import PrimaryTextInput from "../components/widgets/PrimaryTextInput";
import { FirebaseContext } from "../components/context/FirebaseContext";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useRouter } from "next/router";

const SignInPage: React.FC = () => {
  const router = useRouter();

  const { firebaseApp, auth, provider } = useContext(FirebaseContext);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        //  const credential = GoogleAuthProvider.credentialFromResult(result);
        //  const token = credential.accessToken;
        //  const user = result.user;

        const additionalInfo = getAdditionalUserInfo(result);

        if (additionalInfo.isNewUser) {
          await router.push("/complete-signup");
        } else {
          await router.push("/home");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <>
      <main>
        <div className="container">
          <div className="content">
            <h1>CIS Marketplace</h1>
            <button onClick={signIn}>Sign in using Google</button>
          </div>
        </div>
        <div className="image"></div>
      </main>

      <style jsx>{`
        main {
          display: flex;
          background: var(--secondaryBackgroundColor);
        }

        button {
          width: 100%;
          margin-top: 10px;
          padding: 10px;
        }

        .container {
          width: 50vw;
          height: 100vh;
          background: #fff;
          font-size: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--primaryColor);
        }

        .image {
          width: 50vw;
          height: 100vh;
          position: relative;
          background-image: url("/cis.jpg");
          background-size: cover;
        }

        .image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: #000;
          z-index: 2;
          opacity: 0.4;
        }
      `}</style>
    </>
  );
};

export default SignInPage;
