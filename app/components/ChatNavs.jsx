"use client";
import { PersonIcon } from "@/(auth)/_components/MobileAuth";
import GrainyBackground from "@/components/GrainyBackground";
import SendSol from "@/components/SendSol";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronDown,
  MoreVertical,
  Copy,
  Workflow,
  ListMinusIcon,
} from "lucide-react";
import {  useState } from "react";
import { useChatContext } from "@/hooks/useChatContext";
import { useWallet } from "@solana/wallet-adapter-react";
import SideBar from "@/components/Sidebar";

export default function Component({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const { activeUser } = useChatContext();
  const { publicKey } = useWallet();
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
                    {activeUser?.username?activeUser.username:"no user"}
                  </h2>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="sm:text-sm text-xs flex cursor-pointer text-gray-500">
                          {publicKey?.toBase58().slice(0, 10)}
                          <ChevronDown className="inline ml-1" size={16} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="p-0">
                        <div className="relative inline-block">
                          {/* Tooltip */}
                          <div className="bg-purle-700 border-purple-400 border text-white text-sm rounded-lg shadow-lg  max-w-xs">
                            <div className="flex items-center ">
                              <span className="font-mono p-2 pr-0 text-xs">
                                {publicKey?.toBase58().slice(0, 20)}
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
                <SendSol />
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
