"use client";
import { PersonIcon } from "@/(auth)/_components/MobileAuth";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import GrainyBackground from "@/components/GrainyBackground";
import SendSui from "@/components/SendSui";
import ChatList from "@/components/ChatList";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Search,
  MoreVertical,
  ChevronDown,
  Home,
  Copy,
  Workflow,
  X,
  ListMinusIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

export default function Component({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="h-[94vh] sm:h-screen  bg-orange-400 w-full  relative ">
      <div className="flex h-full relative overflow-hidden  bg-gray-950 text-gray-300">
        <GrainyBackground className=" h-full  w-full">
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="flex-1 w-full h-full  overflow-hidden flex flex-col ">
            <div className="p-4  h-[80px] bg-gray-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ListMinusIcon
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className="sm:hidden"
                />
                <div className="bg-orange-400 backdrop-blur-sm bg-opacity-70 size-10 rounded-full p-2">
                  <PersonIcon className="size-full fill-orange-700 rounded-full text-white stroke-white" />
                </div>
                <div className=" relative">
                  <h2 className="sm:text-xl text-sm font-bold text-slate-300">
                    Suift Admin
                  </h2>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="sm:text-sm text-xs flex cursor-pointer text-gray-500">
                          0x1234...5678
                          <ChevronDown className="inline ml-1" size={16} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="p-0">
                        <div className="relative inline-block">
                          {/* Tooltip */}
                          <div className="bg-purle-700 border-purple-400 border text-white text-sm rounded-lg shadow-lg  max-w-xs">
                            <div className="flex items-center ">
                              <span className="font-mono p-2 pr-0 text-xs">
                                0x12340x123456780x123456785678
                              </span>
                              <div className=" group cursor-pointer p-3">
                                <Copy
                                  size={16}
                                  className="ml-2 group-active:stroke-purple-700  stroke-purple-500"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xs bg-blue-800 text-gray-200 flex items-center px-4 py-2 rounded-full mr-2">
                  <span className="sm:inline hidden">
                    Currently in development
                  </span>
                  <span className="inline sm:hidden">Dev</span>
                  <Workflow size={16} className="ml-1" />
                </span>
                <SendSui />
                <button className="p-2 rounded-full hover:bg-gray-800">
                  <MoreVertical size={24} className="text-purple-600" />
                </button>
              </div>
            </div>
            <div className="h-full overflow-hidden flex flex-col sm:flex-row w-full">
              {children}
            </div>
          </div>
        </GrainyBackground>
      </div>
    </div>
  );
}

const SideBar = ({ isOpen, setIsOpen }) => {
  const dummyUsers = [
    "Chidi",
    "Josh",
    "Divine",
    "Wisdom",
    "Charles",
    "Henditz",
    "Timothy",
  ];

  return (
    <div
      className={clsx(
        "w-80 sm:relative z-[30]  bg-gray-900 absolute left-0 net-0 tp-0 h-full shrink-0  flex-col border-r border-gray-800",
        {
          "sm:flex hidden": !isOpen,
        }
      )}
    >
      <div className="p-4 h-[80px] flex justify-between items-center bg-gray-900">
        <div className="flex gap-4">
          <Link href="/" className="">
            <Home className=" " />
          </Link>
          <h1 className="text-xl font-bold text-slate-300">Suift Chat</h1>
        </div>
        <div className="">
          <button className="p-2 rounded-full hover:bg-gray-800">
            <MoreVertical size={24} className="text-slate-300" />
          </button>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            className="p-2 sm:hidden rounded-full hover:bg-gray-800"
          >
            <X size={24} className="text-slate-300" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats"
            className="w-full p-2 pl-10 rounded-full bg-gray-900 ring-purple-900 ring-[1px] focus:outline-none focus:ring-2 focus:ring-purple-700 text-gray-300"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {dummyUsers.map((user, i) => (
          <div
            key={i}
            className="flex items-center p-4 gap-3 hover:bg-gray-800 cursor-pointer"
          >
            <div className="bg-orange-400 backdrop-blur-sm bg-opacity-70 size-10 rounded-full p-2">
              <PersonIcon className="size-full fill-orange-700 rounded-full text-white stroke-white" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-slate-300">{user}</h3>
                <span className="text-xs text-gray-500">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                Last message here...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
