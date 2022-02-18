import React, { useContext } from "react";
import PrimaryTextInput from "../components/widgets/PrimaryTextInput";
import { FirebaseContext } from "../components/context/FirebaseContext";
import SignupContainer from "../components/ui/SignupContainer";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const SignInPage: React.FC = () => {
  const router = useRouter();

  const { firebase, auth, provider, db } = useContext(FirebaseContext);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        //  const credential = GoogleAuthProvider.credentialFromResult(result);
        //  const token = credential.accessToken;
        const user = result.user;
        await setDoc(doc(db, "users", user.uid), user);

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
      <SignupContainer>
        <div className="content">
          <h1>CIS Marketplace</h1>
          <button onClick={signIn}>Sign in using Google</button>
        </div>
      </SignupContainer>

      <style jsx>{`
        button {
          width: 100%;
          margin-top: 10px;
          padding: 10px;
        }
      `}</style>
    </>
  );
};

export default SignInPage;
