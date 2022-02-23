import { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, getAuth } from "firebase/auth";

function useRedirectWhenLoggedIn() {
  const router = useRouter();

  //Redirects user to homepage if they try to access the homepage/ the complete signup page when logged in
  useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        await router.push("/home");
      }
    });
  });
}

export default useRedirectWhenLoggedIn;
