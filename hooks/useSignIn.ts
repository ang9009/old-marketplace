import { useRouter } from "next/router";
import { getAdditionalUserInfo, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { provider } from "../config/firebase.config";
import { toast } from "react-toastify";
import baseUser from "../types/baseUser.interface";
import { doc, getFirestore, setDoc } from "firebase/firestore";

function useRedirectWhenLoggedIn() {
  const router = useRouter();
  const db = getFirestore();

  const signIn = () => {
    const auth = getAuth();

    signInWithPopup(getAuth(), provider)
      .then(async (result) => {
        const additionalInfo = getAdditionalUserInfo(result);
        const authUser = result.user;

        if (!authUser.email.endsWith("cis.edu.hk")) {
          await signOut(auth);
          return;
        }

        if (additionalInfo.isNewUser) {
          const incompleteUser: baseUser = {
            email: authUser.email,
            name: authUser.displayName,
            id: authUser.uid,
            hasCompletedSignup: false,
          };

          await setDoc(doc(db, "users", incompleteUser.id), incompleteUser);
          await router.push("/complete-signup");
        } else {
          await router.push("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return signIn;
}

export default useRedirectWhenLoggedIn;