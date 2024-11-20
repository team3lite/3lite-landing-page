"use client";
import React from "react";
import useAuth from "@/hooks/useAuth";

const GoogleButton = ({ children }) => {
  const { loginWithG } = useAuth();
  return <div onClick={loginWithG}>{children}</div>;
};

export default GoogleButton;
