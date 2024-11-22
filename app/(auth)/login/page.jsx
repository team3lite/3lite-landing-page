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
          <div className="self-stretch group px-4 py-[15px] bg-[#3a3f52] rounded-xl   ring-0 focus-within:ring-[2px] focus-within:ring-[#5739f2] justify-start items-center gap-2 inline-flex">
            <PersonIcon className="group-focus-within:stroke-white stroke-slate-400" />
            <input
              type="email"
              id="email_signin_mob"
              placeholder="team3Lite@gmail.com"
              className="bg-transparent text-white border-none  outline-none no-underline"
            />
            <CircleCheck size={24} className="text-white  fill-[#038654]" />
          </div>
          <div className="group self-stretch ring-0 focus-within:ring-[2px] focus-within:ring-[#5739f2]  pl-4 py-[10px] bg-[#3a3f52] rounded-xl justify-start items-center gap-2 inline-flex">
            <PasswordIcon className="group-focus-within:stroke-white stroke-slate-400" />
            <PasswordInput
              id="password_signin_mob"
              type="password"
              className="bg-transparent py-1 focus-visible:outline-none  focus-visible:ring-0  text-white border-none  outline-none no-underline"
            />
          </div>
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="text-[#858dab] text-sm font-medium font-['Inter'] leading-normal tracking-tight">
              Remember password
            </div>
            <Switch
              id="airplane-mode"
              thumbColor="bg-[#5739f2 bg-white"
              className="data-[state=checked]:bg-[#5739f2] data-[state=unchecked]:bg-purple-300"
            />
          </div>
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
