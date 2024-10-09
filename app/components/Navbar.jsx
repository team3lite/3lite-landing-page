import React from "react";
import { navLinks } from "../utils/constants";
import logo from "../assets/images/logo.svg";
import star from "../assets/images/star.svg";
import Image from "next/image";
import Link from "next/link";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, Home, Activity, Layers, Users, Lock } from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard" },
  { icon: Activity, label: "Transactions" },
  { icon: Layers, label: "Smart Contracts" },
  { icon: Users, label: "Network" },
  { icon: Lock, label: "Security" },
];

const Navbar = () => {
  return (
    <div className="w-full h-full bg-transparent">
      <div className="w-full h-full bg-inherit flex justify-between items-center px-10 py-1 border-b-[1px] border-gray-700">
        <div>
          <div className="rounded-full overflow-hidden relative md:w-[51px] size-[51px] md:h-[51px]">
            <Image src={logo} fill className="w-full h-full" alt="logo" />
          </div>
        </div>
        <div className="hidden md:flex justify-center gap-x-5 w-1/3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.link}
              className="text-white underline-under underline items-center gap-1  decoration-slate-400 underline-offset-2 flex  shrink-0"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex">
          <Link href="signup">
            <div className="bg-gradient-to-r from-[#472F8C66] to-[#8A2C8F]  flex gap-x-2 px-3 py-2 rounded-full">
              <Image src={star} className="w-[20px] h-[20px]" alt="star" />
              <button className="capitalize text-white">
                Get Early Access
              </button>
            </div>
          </Link>
        </div>

        <div className="md:hidden h-[700px]">
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="stroke-white" />
            </SheetTrigger>

            <SheetContent className=" bg-[#231c4f] flex flex-col pb-3 text-white text-base   h-full shadow-lg border-0  ">
              <SheetHeader className="h-fit ">
                <SheetTitle>
                  <div className="w-full  flex justify-center">
                    <Image
                      src={logo}
                      className="size-[70px] sm:w-[100px]"
                      alt="logo"
                    />
                  </div>
                </SheetTitle>
              </SheetHeader>

              {/* <div className="bg-red-300 w-[200px] h-full"></div> */}
              {/* <div className="relative  flex-grow bg-red-200 "></div> */}
              <div className="relative  flex-grow  ">
                <div
                  className={`inset-y-4  h-full right-0   transform transition-transform duration-300 ease-in-out z-40 flex flex-col`}
                >
                  <nav className=" flex-grow">
                    <div className="space-y-4 p-2 pt-7 ">
                      {navLinks.map(({ icon: Icon, name, link }) => (
                        <SheetClose key={name} asChild>
                          <div className="border-purple-400 mt-6 border  rounded-full">
                            <Link
                              href={link}
                              className="flex items-center space-x-6 text-gray-300 hover:text-white  rounded-lg px-4 py-3 transition-all duration-200 group"
                            >
                              <span className="relative">
                                <Icon
                                  size={20}
                                  className="group-hover:opacity-0 transition-opacity text-white duration-200"
                                />
                                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <span className="w-2 h-2   bg-white rounded-full"></span>
                                </span>
                              </span>
                              <span className="font-medium  text-center  text-white">
                                {name}
                              </span>
                            </Link>
                          </div>
                        </SheetClose>
                      ))}
                    </div>
                  </nav>

                  <div className="flex-shrink-0 pb-9 place-content-center flex text-base">
                    <div className="min-w-[200px] w-full max-w-[300px] ">
                      <Link
                        href="/signup"
                        className="bg-gradient-to-r from-[#472F8C66] to-[#8A2C8F] justify-center flex gap-x-2 px-4 py-4 rounded-full"
                      >
                        <Image
                          src={star}
                          className="w-[20px] h-[20px]"
                          alt="star"
                        />
                        <span className="capitalize text-white">
                          Get Early Access
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
