import { useRouter } from "next/router";
import { useEffect } from "react";

function useCompletedSignupRedirect(userDocSnap) {
  const router = useRouter();

  useEffect(() => {
    if (userDocSnap) {
      const redirect = async () => {
        const hasCompletedSignup: boolean = userDocSnap.get("hasCompletedSignup");
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
