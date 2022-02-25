import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, getFirestore, DocumentSnapshot, DocumentData } from "firebase/firestore";

export default function useGetUser() {
  const db = getFirestore();
  const auth = getAuth();
  const [userDocSnap, setUserDocSnap] = useState<DocumentSnapshot<DocumentData>>(null);
  const [authUser, setAuthUser] = useState<User>(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setUserDocSnap(docSnap);
      } else {
        console.log("Not logged in");
      }
    });
  }, []);

  return { authUser, userDocSnap };
}
