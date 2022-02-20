import { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, getAuth } from "firebase/auth";

function useAuth() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (!user) {
        await router.push("/");
      }
    });
  });
}

export default useAuth;
