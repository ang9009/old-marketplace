import React, { useState, useEffect } from "react";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { getFirestore, Firestore } from "firebase/firestore";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

interface Context {
  app: FirebaseApp;
  provider: GoogleAuthProvider;
  auth: Auth;
  storage: FirebaseStorage;
}

export const FirebaseContext = React.createContext<Context>(null);

export const FirebaseProvider: React.FC = ({ children }) => {
  const [app, setApp] = useState<FirebaseApp>(null);
  const [provider, setProvider] = useState<GoogleAuthProvider>(null);
  const [auth, setAuth] = useState<Auth>(null);
  const [storage, setStorage] = useState<FirebaseStorage>(null);

  useEffect(() => {
    setApp(initializeApp(firebaseConfig));
    setProvider(new GoogleAuthProvider());
    setAuth(getAuth());
    setStorage(getStorage());
  }, []);

  return (
    <FirebaseContext.Provider value={{ app, provider, auth, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};
