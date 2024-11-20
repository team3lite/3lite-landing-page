"use client";
import { ChatContext } from "@/providers/ChatContext";

import { useContext } from "react";

export const useChatContext = () => {
  const { activeUser, setActiveUser } = useContext(ChatContext);
  return { activeUser, setActiveUser };
};
