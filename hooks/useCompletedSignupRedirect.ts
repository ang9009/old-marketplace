import { useRouter } from "next/router";
import { useEffect } from "react";
import useGetCurrUser from "./useGetCurrUser";

function useCompletedSignupRedirect() {
  const router = useRouter();
  const { userData } = useGetCurrUser();

  //If the user has completed their signup, redirect to home, otherwise redirect to the complete signup page
  useEffect(() => {
    if (userData) {
      const redirect = async () => {
        const hasCompletedSignup: boolean = userData.hasCompletedSignup;
        if (hasCompletedSignup) {
          await router.push("/home");
        } else {
          await router.push("/complete-signup");
        }
      };

      redirect();
    }
  }, [userData]);
}

export default useCompletedSignupRedirect;
