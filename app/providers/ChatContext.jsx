"use client";

import { createContext, useState } from "react";

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
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
