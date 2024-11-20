import { CircleCheck, MoveLeft } from "lucide-react";
import React from "react";
import Image from "next/image";
import { AppleLogo, GoogleLogo } from "../login/page";
import { AccMessage } from "./AuthMessage";
import GoogleButton from "./GoogleButton";
import Link from "next/link";
import logo from "@/assets/images/logo.svg";
import { cn } from "@/lib/utils";
import { SolLogo } from "@/components/SolLogo";
const MobileAuth = ({ children }) => {
  return (
    <div className="w-full h-[735px] pt-[23px] bg-[#333747] flex-col justify-start items-center gap-1.5 inline-flex">
      <div className="self-stretch px-[23px] justify-between items-center  inline-flex">
        <Link href="/">
          <MoveLeft size={24} className="text-white" />
        </Link>
        <div className="text-center text-white text-sm font-medium font-['Inter'] leading-tight">
          Need some help?
        </div>
      </div>
      <div className="self-stretch h-[682px] px-6 py-9 bg-[#070322] rounded-tl-[20px] rounded-tr-[20px] flex-col justify-start items-center gap-7 flex">
        <Image
          src={logo}
          width={113}
          height={155}
          className="w-[65px]"
          alt="logo"
        />
        {children}
        <div className="h-5 relative flex w-full">
          <div className="w-full ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-full"
              viewBox="0 0 327 2"
              fill="none"
            >
              <path d="M0 1H327" stroke="#515978" />
            </svg>
          </div>
          <div className="text-center shrink-0 w-fit px-2 py-1 bg-[#282a37]  text-[#858dab] text-xs font-medium font-['Inter'] leading-tight">
            or continue with
          </div>
          <div className="w-full ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-full"
              viewBox="0 0 327 2"
              fill="none"
            >
              <path d="M0 1H327" stroke="#515978" />
            </svg>
          </div>
        </div>
        <div className="self-stretch justify-center items-center gap-[13px] inline-flex">
          <GoogleButton>
            <div className="w-12 bg-opacity-20 place-content-center place-items-center flex h-12 relative bg-white rounded-[27.27px]">
              <GoogleLogo />
            </div>
          </GoogleButton>
          <div className="w-12 bg-opacity-20 place-content-center place-items-center flex h-12 relative bg-white rounded-[27.27px]">
            <AppleLogo />
          </div>
          <div className="w-12 h-12 p-3 relative  bg-opacity-20 bg-white rounded-[27.27px] border border-[#515978]">
            <SolLogo className="p-2" />
          </div>
        </div>
        <AccMessage />
      </div>
    </div>
  );
};

export default MobileAuth;

export const PersonIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <circle
        cx="12.0134"
        cy="6.78512"
        r="3.59128"
        stroke="inherit"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4.77808 16.5286C4.77808 14.1661 8.01114 12.251 11.9993 12.251M4.77808 16.5286C4.77808 18.3635 6.72839 19.9285 9.46803 20.536M4.77808 16.5286C4.77808 18.115 6.23585 19.4996 8.40115 20.2382C9.46049 20.5995 10.6892 20.8062 11.9993 20.8062C13.3095 20.8062 14.5382 20.5995 15.5975 20.2382C17.7628 19.4996 19.2206 18.115 19.2206 16.5286M4.77808 16.5286C4.77808 14.6937 6.72839 13.1287 9.46803 12.5212M11.9993 12.251C13.3095 12.251 14.5382 12.4577 15.5975 12.819M11.9993 12.251C15.9875 12.251 19.2206 14.1661 19.2206 16.5286M11.9993 12.251C10.6892 12.251 9.46049 12.4577 8.40115 12.819M19.2206 16.5286C19.2206 18.3635 17.2703 19.9285 14.5306 20.536M19.2206 16.5286C19.2206 14.6937 17.2703 13.1287 14.5306 12.5212"
        stroke="inherit"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const PasswordIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M16.8327 10.4735V6.72849C16.8327 4.05985 14.6694 1.89648 12.0007 1.89648V1.89648C9.33206 1.89648 7.1687 4.05985 7.1687 6.72849V10.4735"
        stroke="inherit"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3.67114"
        y="10.4731"
        width="16.6593"
        height="11.6304"
        rx="5"
        stroke="inherit"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse
        cx="12.0001"
        cy="15.5203"
        rx="1.38606"
        ry="1.38606"
        stroke="inherit"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0325 16.9067L12.0325 18.7899"
        stroke="inherit"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SuiLogo = ({ className }) => {
  return (
    <svg
      id="Layer_1"
      x="0px"
      y="0px"
      viewBox="0 0 300 383.5"
      className={cn("w-full h-full", className)}
      style={{ enableBackground: "new 0 0 300 383.5" }}
    >
      <path
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          fill: "#4DA2FF",
        }}
        className="st0"
        d="M240.1,159.9c15.6,19.6,25,44.5,25,71.5s-9.6,52.6-25.7,72.4l-1.4,1.7l-0.4-2.2c-0.3-1.8-0.7-3.7-1.1-5.6
	c-8-35.3-34.2-65.6-77.4-90.2c-29.1-16.5-45.8-36.4-50.2-59c-2.8-14.6-0.7-29.3,3.3-41.9c4.1-12.6,10.1-23.1,15.2-29.4l16.8-20.5
	c2.9-3.6,8.5-3.6,11.4,0L240.1,159.9L240.1,159.9z M266.6,139.4L154.2,2c-2.1-2.6-6.2-2.6-8.3,0L33.4,139.4l-0.4,0.5
	C12.4,165.6,0,198.2,0,233.7c0,82.7,67.2,149.8,150,149.8c82.8,0,150-67.1,150-149.8c0-35.5-12.4-68.1-33.1-93.8L266.6,139.4
	L266.6,139.4z M60.3,159.5l10-12.3l0.3,2.3c0.2,1.8,0.5,3.6,0.9,5.4c6.5,34.1,29.8,62.6,68.6,84.6c33.8,19.2,53.4,41.3,59.1,65.6
	c2.4,10.1,2.8,20.1,1.8,28.8l-0.1,0.5l-0.5,0.2c-15.2,7.4-32.4,11.6-50.5,11.6c-63.5,0-115-51.4-115-114.8
	C34.9,204.2,44.4,179.1,60.3,159.5L60.3,159.5z"
      />
    </svg>
  );
};
