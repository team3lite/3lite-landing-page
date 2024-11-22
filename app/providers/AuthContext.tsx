"use client";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
export type UserDetails = {
  _id:string;
  username: string;
  walletAddress: string;
  avatar?: string;
  walletType: string;
};
export const AuthProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);
  const setUser = (user: UserDetails) => {
    //update the in memory state and local storage
    setActiveUser(user);
    localStorage.setItem("3liteuser", JSON.stringify(user));
  };
  console.log(activeUser)

  useEffect(() => {
    const user = localStorage.getItem("3liteuser");
    if (user) {
      setActiveUser(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        activeUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
