"use client";

import { dummyUsers } from "@/data";
import { createContext, useState } from "react";

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  dummyUsers.slice(0, 1);
  const [activeUser, setActiveUser] = useState(null);

  return (
    <ChatContext.Provider
      value={{
        activeUser,
        setActiveUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
