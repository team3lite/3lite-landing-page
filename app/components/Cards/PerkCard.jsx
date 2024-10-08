import React from "react";
import star from "../../assets/icons/mini-star.svg";
import Image from "next/image";

const PerkCard = ({ title, description, image }) => {
  return (
    <div className="w-full h-full relative  bg-[#070322] ">
      <div className="w-full h-full">
        <div className="lg:min-h-[372px] h-fit w-[320px] sm:min-w-[320px] lg:min-w-[320px] lg:w-[340px] max-w-[354.83px] bg-[#4935824D]  border-[1px] border-gray-500 rounded-2xl p-5 pb-6">
          <div className="w-full -200 flex justify-between pb-4">
            <div className="">
              <StarIcon />
            </div>
            <div className="">
              <StarIcon />
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <h2 className="text-white font-suse  text-2xl font-normal text-center sm:text-3xl">
              {title}
            </h2>
            <p className="text-slate-300 font-Syne text-[16px] text-center leading-[23.6px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerkCard;

const StarIcon = () => {
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
