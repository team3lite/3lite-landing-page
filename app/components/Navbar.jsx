import React from "react";
import { navLinks } from "../utils/constants";
import logo from "../assets/images/logo.svg";
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
      <div className="w-full h-full bg-inherit flex justify-between items-center px-10 py-4 border-b-[1px] border-gray-700">
        <div className="flex items-center">
          <div className=" h-[41px] md:h-[51px]">
            <Image src={logo} className="w-full h-full" alt="logo" />
          </div>
          <span className="text-lg font-semibold">3lite Messenger</span>
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
          <Link href="/">
            <button className="flex  items-center gap-x-1 bg-brand-light px-4  rounded-lg">
              <Image src={logo} className="w-[40px] h-[40px]" alt="star" />
              <span>
                Message
              </span>
            </button>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <div>
              <SheetTrigger asChild>
                <Menu />
              </SheetTrigger>
            </div>

            <SheetContent className=" bg-brand text-white text-base  h-full shadow-lg border-0  ">
              <SheetHeader className="">
                <SheetTitle>
                  <div className="w-full flex justify-center">
                    <div className="flex items-center">
                      <div className=" h-[41px] md:h-[51px]">
                        <Image src={logo} className="w-full h-full" alt="logo" />
                      </div>
                      <span className="text-lg font-semibold">3lite Messenger</span>
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="relative bg h-full ">
                <div
                  className={`inset-y-4  h-full right-0   transform transition-transform duration-300 ease-in-out z-40 flex flex-col`}
                >
                  <nav className="">
                    <div className="space-y-4 p-2 pt-7 ">
                      {navLinks.map(({ icon: Icon, name, link }) => (
                        <SheetClose key={name} asChild>
                          <div className="border-gray-400 mt-6 border  rounded-full">
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

                  <div className="flex-shrink-0 pb-9 px-2 mt-5 text-base">
                    <div className="w-[200px]">
                      <Link href="/">
                        <button className="flex  items-center gap-x-1 bg-brand-light px-4  rounded-lg">
                          <Image src={logo} className="w-[40px] h-[40px]" alt="star" />
                          <span>
                            Message
                          </span>
                        </button>
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
