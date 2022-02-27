import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User as AuthUser } from "firebase/auth";
import { doc, getDoc, getFirestore, DocumentSnapshot, DocumentData } from "firebase/firestore";

import User from "../types/user.interface";

export default function getUser(userId: string) {
  // const db = getFirestore();
  // const auth = getAuth();
  //
  // const docRef = doc(db, "users", user.uid);
  // const docSnap = await getDoc(docRef);
  //
  // return { userDocSnap: userDocSnap.data() as User, isLoading };
}
