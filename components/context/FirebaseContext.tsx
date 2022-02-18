import React, { useState, useEffect } from "react";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

interface Context {
  firebase: FirebaseApp;
  provider: GoogleAuthProvider;
  auth: Auth;
}

export const FirebaseContext = React.createContext<Context>(null);

export const FirebaseProvider: React.FC = ({ children }) => {
  const [firebase, setFirebase] = useState<FirebaseApp>(null);
  const [provider, setProvider] = useState<GoogleAuthProvider>(null);
  const [auth, setAuth] = useState<Auth>(null);

  useEffect(() => {
    setFirebase(initializeApp(firebaseConfig));
    setProvider(new GoogleAuthProvider());
    setAuth(getAuth());
  }, []);

  return (
    <FirebaseContext.Provider value={{ firebase, provider, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
};
