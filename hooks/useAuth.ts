import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../components/context/FirebaseContext";

function useAuth() {
  const router = useRouter();

  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    if(!!auth) {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          await router.push("/");
        }
      });
    }
  }, [auth]);
}

export default useAuth;
