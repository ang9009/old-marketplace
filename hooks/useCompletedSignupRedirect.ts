import { useRouter } from "next/router";
import { useEffect } from "react";
import useGetCurrUser from "./useGetCurrUser";

function useCompletedSignupRedirect() {
  const router = useRouter();
  const { userDocSnap } = useGetCurrUser();

  useEffect(() => {
    if (userDocSnap) {
      const redirect = async () => {
        const hasCompletedSignup: boolean = userDocSnap.hasCompletedSignup;
        if (hasCompletedSignup) {
          await router.push("/home");
        } else {
          await router.push("/complete-signup");
        }
      };

      redirect();
    }
  }, [userDocSnap]);
}

export default useCompletedSignupRedirect;
