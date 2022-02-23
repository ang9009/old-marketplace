import React, { useState, SetStateAction, Dispatch } from "react";
import { FirebaseApp } from "firebase/app";
import { Auth, GoogleAuthProvider } from "firebase/auth";
import BaseUser from "../../types/baseUser.interface";

interface Context {
  user: BaseUser;
  setUser: Dispatch<SetStateAction<BaseUser>>;
}

export const UserContext = React.createContext<Context>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<BaseUser>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
