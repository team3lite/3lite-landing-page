"use client";
import PasswordInput from "../_components/CustomPasswordField";
import Link from "next/link";
import { PasswordIcon, PersonIcon } from "../_components/MobileAuth";
import { CircleCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import WalletConnectionHandler from "@/components/WalletButton";

const Page = () => {

  return (
    <>
      <div className="sm:flex w-96  font-Syne  px-12 py-6 rounded-2xl border border-neutral-600 flex-col justify-start items-center gap-3 hidden">
        <div className="Txt mb-3 flex-col justify-start items-center gap-2 flex">
          <div className="font-suse text-white text-3xl font-semibold ">
            Continue to 3Lite
          </div>
        </div>

        <div className=" w-full  flex-col justify-center items-center gap-3 flex">
        
            <WalletConnectionHandler/>
          Continue with Solana
        </div>
        <div className="w-full flex justify-center">
          <div className="w-fit ">
            <span className="text-neutral-400 mr-[1px] text-sm font-normal font-['Montserrat']">
              Dont have an account yet?
            </span>
            <span className="text-white text-sm font-normal font-['Montserrat']"></span>
            <Link
              href="/signup"
              className="text-pink-600 text-sm font-normal font-['Montserrat']"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
      <div className="contents sm:hidden">
        <div className="self-stretch  h-[54px] px-[5px] flex-col justify-start items-center gap-2 flex">
          <div className="self-stretch text-center text-white text-2xl font-bold font-['Inter']">
            Getting Started
          </div>
          <div className="self-stretch text-center text-[#b0b5c9] text-sm font-normal font-['Inter']">
            Welcome back, glad to see you again
          </div>
        </div>
        <div className="self-stretch h-[164px] flex-col justify-start items-center gap-4 flex">
       
       
         
        </div>
        <div className="self-stretch px-20 py-4 bg-[#c8497f] rounded-xl justify-center items-center gap-2 inline-flex">
          <Link
            href="/chat"
            className="w-full text-center text-white text-sm font-medium font-['Inter'] leading-tight"
          >
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
