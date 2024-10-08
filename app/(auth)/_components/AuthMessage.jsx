"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AuthMessage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const pathName = usePathname();
  console.log({ pathName });
  useEffect(() => {
    if (pathName === "/signup") {
      setIsSignUp(true);
    } else if (pathName === "/login") {
      setIsSignUp(false);
    }
  }, [pathName]);

  return (
    <>
      <div className=" text-white font-suse text-start text-3xl  text-[27px] font-bold ">
        {isSignUp
          ? "Welcome to Suift Messenger"
          : "Welcome back to Suift Messenger"}
      </div>
      <div className=" text-white mt-1 w-[400px] max-w-full text-opacity-80 font-light font-Poppins  text-sm">
        {isSignUp ? (
          <span>
            Experience secure,{" "}
            <span className="text-orange-400">decentralized</span> communication
            built on the <span className="text-green-400">Sui Blockchain</span>
          </span>
        ) : (
          <span>
            Good to see you again! Dive back into your private,{" "}
            <span className="text-orange-400">secure</span> chats.
          </span>
        )}
      </div>
    </>
  );
};

export default AuthMessage;

export const AccMessage = () => {
  const pathName = usePathname();
  const isSignUp = pathName === "/signup";

  return (
    <>
      <div className="text-center">
        <span className="text-white text-xs font-medium font-['Inter']">
          {isSignUp ? "Don't have an account?" : "Already have an account?"}
        </span>
        <Link
          href={isSignUp ? "/login" : "/signup"}
          className="text-[#5739f2] ml-1 text-xs font-medium font-['Inter']"
        >
          {isSignUp ? "Login" : "Sign Up here"}
        </Link>
      </div>
    </>
  );
};
