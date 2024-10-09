"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "../_components/CustomPasswordField";
import GradientButton from "../_components/GradientButtons";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AppleLogo, GoogleLogo } from "../login/page";
import { CircleCheck, Lock } from "lucide-react";
import { PasswordIcon, PersonIcon } from "../_components/MobileAuth";
import { Switch } from "@/components/ui/switch";
import { useGoogleLogin, useGoogleOAuth } from "@react-oauth/google";
import axios from "axios";
import {
  createUserWithEmail,
  createUserWithGoogle,
} from "@/lib/db/authUtils/authFunctions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SolLogo } from "@/components/SolLogo";

const Page = () => {
  const router = useRouter();
  const signupWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          await createUserWithGoogle({
            email: res.data.email,
            name: res.data.name,
            id: res.data.id,
          });
          console.log({ res: res.data });
          toast.success("Account created successfully", {
            description: "Welcome to the land of decentralized Messaging",
            //success toast style
            position: "top-right",
            style: {
              background: "#038654",
              color: "#fff",
            },
          });
          router.push("/chat");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Account creation failed", {
            description: err.message,
            //success toast style
            position: "top-right",
            style: {
              background: "#ff0000",
              color: "#fff",
            },
          });
        });
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  const signupWithEmail = async (e) => {
    e.preventDefault();
    //const { email, username, password, authType } = data;
    const email = e.target.email_signup.value;
    const password = e.target.password_signup.value;
    //username is email splited befor @ and limited to 20 characters
    const username = email.split("@")[0].slice(0, 20);
    try {
      await createUserWithEmail({
        email,
        password,
        username,
      });
      toast.success("Account created successfully", {
        description: "Welcome to the land of decentralized Messaging",
        //success toast style
        position: "top-right",
        style: {
          background: "#038654",
          color: "#fff",
        },
      });
      router.push("/chat");
    } catch (error) {
      console.log(error);
      toast.error("Account creation failed", {
        description: error.message,
        //success toast style
        position: "top-right",
        style: {
          background: "#ff0000",
          color: "#fff",
        },
      });
    }
  };

  return (
    <>
      <div className="sm:flex hidden w-96  font-Syne  px-12 py-6 rounded-2xl border border-neutral-600 flex-col justify-start items-center gap-3 ">
        <div className="Txt mb-3 flex-col justify-start items-center gap-2 flex">
          <div className="font-suse text-white text-3xl font-semibold ">
            Start using 3Lite
          </div>
        </div>
        <div className="EmailAndPssword bg-rd-100 w-full flex-col justify-start items-end gap-4 flex">
          <div className="Fields text-white self-stretch  ">
            <form
              className="w-full flex-col justify-start items-center gap-5 flex"
              id="signup_form"
              onSubmit={signupWithEmail}
            >
              <div className="Txt self-stretch  flex-col justify-start items-start gap-2 flex">
                <Label htmlFor="email_signup">E-mail</Label>
                <Input
                  type="email"
                  name="email_signup"
                  id="email_signup"
                  placeholder="team3elite@gmail.com"
                  className="bg-transparent"
                />
              </div>
              <div className="Txt self-stretch  flex-col justify-start items-start gap-3 flex">
                <Label htmlFor="password_signup">Password</Label>
                <PasswordInput
                  id="password_signup"
                  name="password_signup"
                  type="password"
                  className="bg-transparent"
                />
              </div>
            </form>
          </div>

          <div className="w-full mt-3">
            <Button
              form="signup_form"
              size="lg"
              className="w-full relative font-suse text-base bg-white text-black hover:text-black hover:bg-slate-200"
            >
              Create Account
              <Lock size={17} className="absolute right-2 stroke-purple-800" />
            </Button>
          </div>
        </div>
        <div className="Or text-neutral-400 text-sm font-normal font-['Poppins']">
          OR
        </div>
        <div className=" w-full  flex-col justify-center items-center gap-3 flex">
          <GradientButton onClick={() => {}} text="Continue with Solana">
            <div className="size-5">
              <SolLogo />
            </div>
          </GradientButton>
          <GradientButton
            onClick={signupWithGoogle}
            text="Continue with Google"
          >
            <GoogleLogo />
          </GradientButton>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-fit ">
            <span className="text-neutral-400 mr-[1px] text-sm font-normal font-['Montserrat']">
              Already have an account?
            </span>
            <span className="text-white text-sm font-normal font-['Montserrat']"></span>
            <Link
              href="/login"
              className="text-pink-600 text-sm font-normal font-['Montserrat']"
            >
              Login
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
              id="email_signup"
              placeholder="team3Lite@gmail.com"
              className="bg-transparent text-white border-none  outline-none no-underline"
            />
            <CircleCheck size={24} className="text-white  fill-[#038654]" />
          </div>
          <div className="group self-stretch ring-0 focus-within:ring-[2px] focus-within:ring-[#5739f2]  pl-4 py-[10px] bg-[#3a3f52] rounded-xl justify-start items-center gap-2 inline-flex">
            <PasswordIcon className="group-focus-within:stroke-white stroke-slate-400" />
            <PasswordInput
              id="password_signin"
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
          <div className="text-center text-white text-sm font-medium font-['Inter'] leading-tight">
            Create Account
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
