import { doc, getDoc, getFirestore } from "firebase/firestore";

import User from "../types/user.interface";

export default async function getUser(userId: string) {
  const db = getFirestore();

  const docRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(docRef);

  return { userData: userDocSnap?.data() as User };
}
