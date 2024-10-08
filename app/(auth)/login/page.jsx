"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "../_components/CustomPasswordField";
import GradientButton from "../_components/GradientButtons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PasswordIcon, PersonIcon } from "../_components/MobileAuth";
import { CircleCheck, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useGoogleLogin } from "@react-oauth/google";
import { SolLogo } from "@/components/SolLogo";
import axios from "axios";
import {
  loginWithEmail,
  loginWithGoogle,
} from "@/lib/db/authUtils/authFunctions";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
  const [loggingIn, setLoggingIn] = useState(false);
  const router = useRouter();
  // log out function to log the user out of google and set the profile array to null
  const loginWithG = useGoogleLogin({
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
          setLoggingIn(true);
          const resp = await loginWithGoogle({
            email: res.data.email,
            name: res.data.name,
            id: res.data.id,
          });

          setLoggingIn(false);
          toast.success("Logged in successfully", {
            //success toast style
            position: "top-right",
            style: {
              background: "#038654",
              color: "#fff",
            },
          });
          router.push("/chat");
          console.log({ resp });
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message, {
            //error toast style
            position: "top-right",
            style: {
              background: "#C8497F",
              color: "#fff",
            },
          });
        });
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  // log in function to log the user in with email and password
  const loginWithE = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    const email = e.target.email_signin.value;
    const password = e.target.password_signin.value;
    console.log({ email, password });
    try {
      const resp = await loginWithEmail({ email, password });
      console.log({ resp });
      toast.success("Logged in successfully", {
        //success toast style
        position: "top-right",
        style: {
          background: "#038654",
          color: "#fff",
        },
      });
      router.push("/chat");
    } catch (err) {
      toast.error(err.message, {
        //error toast style
        position: "top-right",
        style: {
          background: "#C8497F",
          color: "#fff",
        },
      });
    } finally {
      setLoggingIn(false);
    }
  };
  return (
    <>
      <div className="sm:flex w-96  font-Syne  px-12 py-6 rounded-2xl border border-neutral-600 flex-col justify-start items-center gap-3 hidden">
        <div className="Txt mb-3 flex-col justify-start items-center gap-2 flex">
          <div className="font-suse text-white text-3xl font-semibold ">
            Login to 3Lite
          </div>
        </div>
        <div className="EmailAndPssword bg-rd-100 w-full flex-col justify-start items-end gap-4 flex">
          <div className="Fields text-white  self-stretch ">
            <form
              className="w-full flex-col justify-start items-center gap-5 flex"
              id="signup_form"
              onSubmit={loginWithE}
            >
              <div className="Txt self-stretch  flex-col justify-start items-start gap-2 flex">
                <Label htmlFor="email_signin">E-mail</Label>
                <Input
                  type="email"
                  id="email_signin"
                  name="email_signin"
                  placeholder="team3elite@gmail.com"
                  className="bg-transparent"
                />
              </div>
              <div className="Txt self-stretch  flex-col justify-start items-start gap-3 flex">
                <Label htmlFor="password_signin">Password</Label>
                <PasswordInput
                  id="password_signin"
                  name="password_signin"
                  type="password"
                  className="bg-transparent"
                />
              </div>
            </form>
          </div>
          <div className="ForgotMyPassword text-neutral-400 text-sm font-normal font-['Montserrat']">
            Forgot my password?
          </div>
          <div className="w-full">
            <Button
              size="lg"
              form="signup_form"
              className="w-full font-suse flex items-center gap-1  text-base bg-white active:bg-slate-300 text-black hover:text-black hover:bg-slate-200"
            >
              {loggingIn ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin stroke-orange-300"
                  />{" "}
                  signing in..{" "}
                </>
              ) : (
                <span> Sign in</span>
              )}
            </Button>
          </div>
        </div>
        <div className="Or text-neutral-400 text-sm font-normal font-['Poppins']">
          OR
        </div>
        <div className=" w-full  flex-col justify-center items-center gap-3 flex">
          <GradientButton text="Continue with Solana">
            <div className="size-5">
              <SolLogo />
            </div>
          </GradientButton>
          <GradientButton onClick={loginWithG} text="Continue with Google">
            <GoogleLogo />
          </GradientButton>
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
              placeholder="team3elite@gmail.com"
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

export const AppleLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M18.0494 12.8193C18.0399 11.0643 18.8337 9.73964 20.4405 8.76408C19.5414 7.47768 18.1833 6.76993 16.39 6.63124C14.6923 6.49734 12.8369 7.62115 12.1578 7.62115C11.4405 7.62115 9.79543 6.67906 8.50425 6.67906C5.83581 6.7221 3 8.80712 3 13.0489C3 14.3018 3.22954 15.5962 3.68863 16.932C4.30074 18.687 6.5101 22.991 8.81509 22.9192C10.0202 22.8905 10.8714 22.0632 12.44 22.0632C13.9607 22.0632 14.7497 22.9192 16.0935 22.9192C18.4176 22.8858 20.4166 18.974 21 17.2141C17.882 15.746 18.0494 12.9102 18.0494 12.8193ZM15.3427 4.96706C16.6482 3.41764 16.5287 2.00691 16.4904 1.5C15.3379 1.56695 14.0037 2.28427 13.2434 3.16897C12.4065 4.11583 11.9139 5.28746 12.0191 6.60733C13.2673 6.70298 14.4054 6.06217 15.3427 4.96706Z"
        fill="white"
      />
    </svg>
  );
};
export const GoogleLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20.9999 12.1995C20.9999 11.4616 20.9386 10.9231 20.806 10.3647H12.1836V13.6952H17.2448C17.1428 14.5228 16.5918 15.7693 15.3672 16.6068L15.3501 16.7183L18.0763 18.7822L18.2652 18.8006C19.9999 17.235 20.9999 14.9316 20.9999 12.1995Z"
        fill="#4285F4"
      />
      <path
        d="M12.1836 20.9743C14.6632 20.9743 16.7448 20.1765 18.2652 18.8005L15.3672 16.6067C14.5918 17.1352 13.5509 17.5042 12.1836 17.5042C9.75504 17.5042 7.69383 15.9387 6.95907 13.7749L6.85137 13.7838L4.01656 15.9277L3.97949 16.0284C5.48968 18.96 8.59173 20.9743 12.1836 20.9743Z"
        fill="#34A853"
      />
      <path
        d="M6.95914 13.7748C6.76527 13.2164 6.65307 12.6181 6.65307 11.9999C6.65307 11.3816 6.76527 10.7834 6.94894 10.225L6.94381 10.106L4.07348 7.92773L3.97957 7.97139C3.35715 9.18792 3 10.554 3 11.9999C3 13.4457 3.35715 14.8118 3.97957 16.0283L6.95914 13.7748Z"
        fill="#FBBC05"
      />
      <path
        d="M12.1836 6.49591C13.9081 6.49591 15.0713 7.22382 15.7346 7.83212L18.3264 5.35919C16.7346 3.91334 14.6632 3.02588 12.1836 3.02588C8.59173 3.02588 5.48968 5.04009 3.97949 7.97167L6.94887 10.2252C7.69383 8.06145 9.75504 6.49591 12.1836 6.49591Z"
        fill="#EB4335"
      />
    </svg>
  );
};
