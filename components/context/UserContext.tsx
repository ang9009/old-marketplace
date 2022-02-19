import React, { useState, SetStateAction, Dispatch } from "react";
import { FirebaseApp } from "firebase/app";
import { Auth, GoogleAuthProvider } from "firebase/auth";

interface User {
  name: string;
  email: string;
  id: string;
}

interface Context {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = React.createContext<Context>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

