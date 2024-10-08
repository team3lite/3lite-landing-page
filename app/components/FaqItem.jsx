"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const FaqItem = ({ message, isOpen, onClick }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (isOpen) {
      const contentEl = contentRef.current;
      if (contentEl) {
        setHeight(contentEl.scrollHeight);
      }
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      style={{
        background:
          "linear-gradient(281deg, rgb(7, 3, 34,1)  4%,rgba(255, 255, 255, 0.2)  100%)",
      }}
      className=" rounded-3xl overflow-hidden p-[0.3px]"
    >
      <div
        className={clsx(
          "self-stretch relative z-[0]  overflow-hidden   bg-[#070322]  bg-clip-padding rounded-3xl   border border-transparent  flex flex-col  ",
          {
            " border-white/20": isOpen,
            "border-white/5 border-opacity-[1]": !isOpen,
          }
        )}
      >
        <div
          onClick={onClick}
          className={clsx(
            " p-7  select-none cursor-pointer justify-start items-center gap-5 inline-flex w-full"
          )}
        >
          <div className="grow shrink basis-0 text-white  font-Syne font-medium capitalize sm:text-2xl  text-base sm:text-[22px]   ">
            {message.question}
          </div>
          <div className="justify-center  transition-all duration-1000 ease-in-out items-center gap-2.5 flex">
            {isOpen ? <StarIcon /> : <CloseIcon />}
          </div>
        </div>

        <div
          ref={contentRef}
          style={{
            height: `${height}px`,
          }}
          className=" overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div className="text-opacity-60 h-fit text-white p-8 sm:w-[97%] pt-0 font-suse sm:text-lg text-base font-light  ">
            {message.answer}
          </div>
        </div>
        <div
          hidden={!isOpen}
          className="h-full bg-custom-gradient w-full rounded-3xl -z-[1] absolute top-0 left-0"
        ></div>
      </div>
    </div>
  );
};

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      className="transition-all duration-1000 ease-in-out"
      viewBox="0 0 24 23"
      fill="none"
    >
      <path
        d="M23.375 11.5C23.3776 11.8332 23.2763 12.159 23.0852 12.432C22.8941 12.705 22.6226 12.9117 22.3086 13.0234L15.8655 15.3664L13.5235 21.8085C13.408 22.1195 13.2002 22.3877 12.9278 22.5771C12.6555 22.7666 12.3317 22.8681 12 22.8681C11.6683 22.8681 11.3445 22.7666 11.0722 22.5771C10.7999 22.3877 10.592 22.1195 10.4766 21.8085L8.13455 15.3654L1.69142 13.0234C1.38043 12.908 1.11222 12.7001 0.92282 12.4278C0.733417 12.1554 0.631897 11.8317 0.631897 11.5C0.631897 11.1682 0.733417 10.8445 0.92282 10.5721C1.11222 10.2998 1.38043 10.0919 1.69142 9.97652L8.13455 7.63449L10.4766 1.19136C10.592 0.880372 10.7999 0.612161 11.0722 0.422759C11.3445 0.233356 11.6683 0.131836 12 0.131836C12.3317 0.131836 12.6555 0.233356 12.9278 0.422759C13.2002 0.612161 13.408 0.880372 13.5235 1.19136L15.8665 7.63449L22.3086 9.97652C22.6226 10.0882 22.8941 10.2949 23.0852 10.5679C23.2763 10.8409 23.3776 11.1667 23.375 11.5Z"
        fill="white"
      />
    </svg>
  );
};
const StarIcon = () => {
  return (
    <div className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        className=""
        viewBox="0 0 26 26"
        fill="none"
      >
        <g clipPath="url(#clip0_1_1240)">
          <path
            d="M6.57056 19.2085L19.4288 6.79148"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.57056 6.7915L19.4288 19.2085"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_1240">
            <rect width="26" height="26" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default FaqItem;
