import { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, getAuth } from "firebase/auth";

function useRedirectWhenLoggedOut() {
  const router = useRouter();

  //Redirects user to sign in/sign up page if they try to access another page when they're not logged in
  useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (!user) {
        await router.push("/");
      }
    });
  });
}

export default useRedirectWhenLoggedOut;
