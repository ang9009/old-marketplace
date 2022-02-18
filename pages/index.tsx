import React, { useContext } from "react";
import PrimaryTextInput from "../components/widgets/PrimaryTextInput";
import { FirebaseContext } from "../components/context/FirebaseContext";
import SignupContainer from "../components/ui/SignupContainer";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import User from "../types/user.interface";

const SignInPage: React.FC = () => {
  const router = useRouter();

  const { firebase, auth, provider } = useContext(FirebaseContext);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        //  const credential = GoogleAuthProvider.credentialFromResult(result);
        //  const token = credential.accessToken;

        const additionalInfo = getAdditionalUserInfo(result);

        if (additionalInfo.isNewUser) {
          const user = result.user;
          const db = getFirestore();
          const userObj: User = {
            email: user.email,
            id: user.uid,
            name: user.displayName,
          };

          await setDoc(doc(db, "users", user.uid), userObj);

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
        console.log(error);
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
