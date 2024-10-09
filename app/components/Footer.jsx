import React from "react";
import logo from "../assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import BottomColor from "./BottomColor";
import { ChevronsRight, ChevronsRightIcon } from "lucide-react";

const Footer = () => {
  const links = [
    {
      title: "About Us",
      href: "#",
    },
    {
      title: "Our Services",
      href: "#",
    },
    {
      title: "Community",
      href: "#",
    },
    {
      title: "Testimonials",
      href: "#",
    },
    {
      title: "FAQ",
      href: "#",
    },
    {
      title: "Privacy Policy",
      href: "/privacy",
    },
  ];

  return (
    <footer className=" w-screen overflow-hidden relative mt-[100px]  sm:mt-40">
      <div className="lg:p-[120px]  sm:p-[80px] p-[30px] lg:pb-[0px] pb-[0px] w-full">
        <div className="Frame47433 w-full   gap-y-[40px] grid grid-cols-12">
          <div className="lg:col-[1/3] flex justify-center items-start   col-span-6">
            <div className="w-[100px] relative">
              <Image
                src="/general/logo.jpg"
                fill
                className="w-full h-full"
                alt="logo"
              />
            </div>
          </div>
          <div className=" justify-center  col-span-6 lg:col-[3/8] bg-ed-300 font-syne  items-start flex">
            <div className="Frame1475 font-Poppins flex-col justify-start items-start gap-4 inline-flex">
              <div className="QuickLinks text-white text-sm font-bold ">
                Quick Links
              </div>
              <div className="Frame1472 opacity-60 flex-col justify-start items-start gap-3 flex">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-white underline-under flex items-center gap-1  decoration-slate-400 underline-offset-2 transf text-sm font-normal"
                  >
                    <ChevronsRightIcon size={16} />
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="Frame47432   justify-center  col-span-full lg:col-[8/13]  items-start gap-7 inline-flex">
            <div className="Frame47431   flex-col gap-5 justify-between items-start flex">
              <div className="Frame47430  py-0.5 flex-row gap-1 lg:flex-col justify-start items-start gap- flex">
                <div
                  style={{
                    WebkitTextFillColor: "transparent",
                  }}
                  className="bg-gradient-to-b from-[#FFFFFF] to-slate-600 bg-clip-text    mx-auto text-center flex justify-center  font-Syne w-full font-semibold text-2xl sm:text-3xl "
                >
                  <h1>Join the Suift </h1>
                </div>

                <div className="Community self-stretch text-white text-2xl sm:text-3xl  font-semibold font-['Tomato Grotesk']">
                  Community
                </div>
              </div>
              <div className="w-fit max-w-full  pl-5  rounded-[99px] border border-[#77679f] justify-between items-center flex">
                <input
                  type="text"
                  placeholder="Enter Your Gmail"
                  className="EnterYourGmail grow shrink outline-none  bg-transparent text-white sm:text-lg text-sm font-medium "
                />

                <div className="shrink-0 bg-gradient-to-b hover:bg-gradient-to-t hover:pb-[1px] active:p-[0.4px] rounded-full from-[#77679F] to-[rgba(119,103,159,0)] pt-[1px] px-[1px]">
                  <div className="rounded-full bg-background">
                    <button
                      style={{
                        background:
                          "conic-gradient(from 270deg at 50% 50%, #140F2A 0deg, rgba(100, 67, 194, 0.25) 58.25deg, rgba(71, 47, 140, 0.10) 290deg)",
                      }}
                      className="font-syne  h-[50px]    p-[10px_15px] sm:p-[10px_35px] rounded-[0] sm:rounded-full text-white font-normal sm:text-lg text-sm   "
                    >
                      Join us
                    </button>
                  </div>
                </div>
              </div>
              <div className="socials flex gap-3">
                <Instagram />
                <LinkedIn />
                <FaceBook />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full overflow-hidden h-[400px] bg-emeald-200 relative">
        <MainOverlay />
        <ColoredBottom />
      </div>
    </footer>
  );
};

export default Footer;

const ColoredBottom = () => {
  return (
    <div className="absolute w-full overflow-hidden -top-[350px]  left-0 flex justify-center">
      <div className="w-fit ">
        <BottomColor />
      </div>
    </div>
  );
};

const MainOverlay = () => {
  return (
    <div className="absolute  z-[10] w-full -top-[00px] left-0 flex justify-center">
      <div className="w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1610"
          height="759"
          fill="none"
          viewBox="0 0 1610 759"
        >
          <path fill="#070322" d="M0 0 A1700 1610 0 0 0 1610 0 Z" />
        </svg>
      </div>
    </div>
  );
};

const Instagram = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
    >
      <g opacity="0.67">
        <path
          d="M15.8923 19.6158C15.406 19.6158 14.9518 19.5262 14.5295 19.3471C14.1073 19.168 13.7362 18.9184 13.4163 18.5985C13.0964 18.2786 12.8469 17.9012 12.6677 17.4661C12.4886 17.0311 12.399 16.5704 12.399 16.0842C12.399 15.598 12.4886 15.1437 12.6677 14.7214C12.8469 14.2992 13.0964 13.9281 13.4163 13.6082C13.7362 13.2883 14.1073 13.0388 14.5295 12.8597C14.9518 12.6805 15.406 12.591 15.8923 12.591C16.8647 12.591 17.6901 12.93 18.3682 13.6082C19.0464 14.2864 19.3855 15.1117 19.3855 16.0842C19.3855 16.5704 19.2959 17.0311 19.1168 17.4661C18.9376 17.9012 18.6881 18.2786 18.3682 18.5985C18.0483 18.9184 17.6773 19.168 17.255 19.3471C16.8327 19.5262 16.3785 19.6158 15.8923 19.6158ZM21.4968 16.0842C21.4968 15.8539 21.484 15.6171 21.4584 15.374C21.4328 15.1309 21.3944 14.907 21.3432 14.7023H22.9171V22.4181C22.9171 22.6228 22.8531 22.7891 22.7252 22.9171C22.5972 23.045 22.4309 23.109 22.2261 23.109H9.55839C9.35366 23.109 9.18731 23.045 9.05935 22.9171C8.9314 22.7891 8.86742 22.6228 8.86742 22.4181V14.7023H10.4413C10.3901 14.907 10.3517 15.1309 10.3261 15.374C10.3005 15.6171 10.2877 15.8539 10.2877 16.0842C10.2877 16.8519 10.4349 17.5813 10.7292 18.2723C11.0235 18.9632 11.4202 19.5646 11.9192 20.0764C12.4182 20.5883 13.0132 20.9913 13.7042 21.2856C14.3952 21.5799 15.1245 21.7271 15.8923 21.7271C16.66 21.7271 17.3894 21.5799 18.0803 21.2856C18.7713 20.9913 19.3663 20.5883 19.8653 20.0764C20.3644 19.5646 20.761 18.9632 21.0553 18.2723C21.3496 17.5813 21.4968 16.8519 21.4968 16.0842ZM16.0458 0C18.2723 0 20.358 0.422258 22.3029 1.26677C24.2479 2.11129 25.9497 3.2565 27.4084 4.70242C28.8671 6.14833 30.0187 7.84376 30.8632 9.78871C31.7077 11.7337 32.13 13.8194 32.13 16.0458C32.13 18.2723 31.7077 20.3579 30.8632 22.3029C30.0187 24.2478 28.8671 25.9497 27.4084 27.4084C25.9497 28.8671 24.2479 30.0187 22.3029 30.8632C20.358 31.7077 18.2723 32.13 16.0458 32.13C13.8194 32.13 11.7337 31.7077 9.78871 30.8632C7.84376 30.0187 6.14833 28.8671 4.70242 27.4084C3.25651 25.9497 2.11129 24.2478 1.26677 22.3029C0.422258 20.3579 0 18.2723 0 16.0458C0 13.8194 0.422258 11.7337 1.26677 9.78871C2.11129 7.84376 3.25651 6.14833 4.70242 4.70242C6.14833 3.2565 7.84376 2.11129 9.78871 1.26677C11.7337 0.422258 13.8194 0 16.0458 0ZM25.0284 9.05935C25.0284 8.47075 24.8237 7.97172 24.4142 7.56226C24.0047 7.15279 23.5057 6.94806 22.9171 6.94806H8.86742C8.27882 6.94806 7.77979 7.15279 7.37032 7.56226C6.96086 7.97172 6.75613 8.47075 6.75613 9.05935V23.109C6.75613 23.6976 6.96086 24.1967 7.37032 24.6061C7.77979 25.0156 8.27882 25.2203 8.86742 25.2203H22.9171C23.5057 25.2203 24.0047 25.0156 24.4142 24.6061C24.8237 24.1967 25.0284 23.6976 25.0284 23.109V9.05935ZM22.2261 9.05935C22.4309 9.05935 22.5972 9.12973 22.7252 9.27048C22.8531 9.41123 22.9171 9.58397 22.9171 9.78871V11.9C22.9171 12.1047 22.8531 12.2711 22.7252 12.399C22.5972 12.527 22.4309 12.591 22.2261 12.591H20.1148C19.9101 12.591 19.7374 12.527 19.5966 12.399C19.4559 12.2711 19.3855 12.1047 19.3855 11.9V9.78871C19.3855 9.58397 19.4559 9.41123 19.5966 9.27048C19.7374 9.12973 19.9101 9.05935 20.1148 9.05935H22.2261Z"
          fill="white"
        />
      </g>
    </svg>
  );
};

const LinkedIn = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
    >
      <g opacity="0.67">
        <path
          d="M16.1758 0C18.4023 0 20.488 0.422258 22.4329 1.26677C24.3779 2.11129 26.0797 3.2565 27.5384 4.70242C28.9971 6.14833 30.1487 7.84376 30.9932 9.78871C31.8377 11.7337 32.26 13.8193 32.26 16.0458C32.26 18.2723 31.8377 20.358 30.9932 22.3029C30.1487 24.2478 28.9971 25.9497 27.5384 27.4084C26.0797 28.8671 24.3779 30.0187 22.4329 30.8632C20.488 31.7077 18.4023 32.13 16.1758 32.13C13.9494 32.13 11.8637 31.7077 9.91871 30.8632C7.97377 30.0187 6.27834 28.8671 4.83242 27.4084C3.38651 25.9497 2.2413 24.2478 1.39678 22.3029C0.552263 20.358 0.130005 18.2723 0.130005 16.0458C0.130005 13.8193 0.552263 11.7337 1.39678 9.78871C2.2413 7.84376 3.38651 6.14833 4.83242 4.70242C6.27834 3.2565 7.97377 2.11129 9.91871 1.26677C11.8637 0.422258 13.9494 0 16.1758 0ZM11.1855 12.0535H7.15484V25.1052H11.1855V12.0535ZM9.15097 11.0171C9.71398 11.0171 10.1938 10.8252 10.5905 10.4413C10.9872 10.0574 11.1855 9.58397 11.1855 9.02096C11.1855 8.45795 10.9872 7.98451 10.5905 7.60064C10.1938 7.21677 9.71398 7.02484 9.15097 7.02484C8.58796 7.02484 8.11452 7.21677 7.73065 7.60064C7.34678 7.98451 7.15484 8.45795 7.15484 9.02096C7.15484 9.58397 7.34678 10.0574 7.73065 10.4413C8.11452 10.8252 8.58796 11.0171 9.15097 11.0171ZM25.2352 17.5429C25.2352 16.6216 24.9793 15.7195 24.4674 14.8366C23.9556 13.9537 23.2902 13.2819 22.4713 12.8213C21.7291 12.4118 20.8654 12.1943 19.8802 12.1687C18.8949 12.1431 17.9928 12.3095 17.1739 12.6677V12.0535H13.1816V25.1052H17.1739V17.1206L18.8629 16.3145C19.0676 16.2121 19.3427 16.161 19.6882 16.161C20.0337 16.161 20.3088 16.2249 20.5136 16.3529C20.6671 16.4297 20.8207 16.596 20.9742 16.8519C21.1277 17.1078 21.2045 17.3382 21.2045 17.5429V25.1052H25.2352V17.5429Z"
          fill="white"
        />
      </g>
    </svg>
  );
};
const FaceBook = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
    >
      <g opacity="0.67">
        <path
          d="M16.3059 0C18.527 0 20.6141 0.421251 22.5672 1.26375C24.5203 2.10626 26.2244 3.25512 27.6797 4.71036C29.1349 6.16559 30.2838 7.86336 31.1263 9.80367C31.9688 11.744 32.39 13.8247 32.39 16.0458C32.39 18.267 31.9688 20.3541 31.1263 22.3072C30.2838 24.2602 29.1349 25.9644 27.6797 27.4196C26.2244 28.8749 24.5203 30.0237 22.5672 30.8662C20.6141 31.7087 18.527 32.13 16.3059 32.13C14.0847 32.13 12.004 31.7087 10.0637 30.8662C8.12337 30.0237 6.4256 28.8749 4.97037 27.4196C3.51514 25.9644 2.36627 24.2602 1.52376 22.3072C0.681261 20.3541 0.26001 18.267 0.26001 16.0458C0.26001 13.8247 0.681261 11.744 1.52376 9.80367C2.36627 7.86336 3.51514 6.16559 4.97037 4.71036C6.4256 3.25512 8.12337 2.10626 10.0637 1.26375C12.004 0.421251 14.0847 0 16.3059 0ZM22.3566 7.00809H18.9483C18.2845 7.00809 17.6717 7.12298 17.1101 7.35275C16.5484 7.58252 16.0569 7.88889 15.6357 8.27184C15.2144 8.6548 14.8889 9.08882 14.6592 9.57389C14.4294 10.059 14.3145 10.544 14.3145 11.0291V13.0588H11.2891V17.0415H14.3145V25.0836H18.3355V17.0415H21.3226V13.0588H18.3355V12.0248C18.3355 11.7184 18.4568 11.4759 18.6993 11.2972C18.9419 11.1185 19.1525 11.0291 19.3312 11.0291H22.3566V7.00809Z"
          fill="white"
        />
      </g>
    </svg>
  );
};
