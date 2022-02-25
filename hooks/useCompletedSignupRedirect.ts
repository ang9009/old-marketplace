import { useRouter } from "next/router";
import { useEffect } from "react";
import useGetUser from "./useGetUser";

function useCompletedSignupRedirect() {
  const router = useRouter();
  const { userDocSnap } = useGetUser();

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
