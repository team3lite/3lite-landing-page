"use client";

import { PersonIcon } from "@/(auth)/_components/MobileAuth";
import { Button } from "@/components/ui/button";
import { Settings, User, LogOut, MoreVertical, Home, X, RotateCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useChatContext } from "@/hooks/useChatContext";
import SideBarChat from "@/components/SidebarChat";
import { ScrollArea } from "./ui/scroll-area";
import { getChats, getUsersFromRegex } from "@/actions/dbFunctions";

import { useDebouncedCallback } from "use-debounce";
import { TESTUSERID } from "./ChatList";
import useAuth from "@/hooks/useAuth";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { activeUser, setActiveUser } = useChatContext();
  const {activeUser:user}=useAuth()

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currChats, setCurrChats] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const debounced = useDebouncedCallback(
    async (userRegex) => {
      setIsFetching(true);
      setSearchResults([]);
       getUsersFromRegex(userRegex)
        .then((users) => {
          console.log("userrrr",user)
          console.log(JSON.parse(users),
          user?._id,"sss"
        )
        if(!user?._id){
          setIsFetching(false);
          return
        }
          const parsedUsers = JSON.parse(users).filter(
            (thisUser) => thisUser._id.toString() !== user._id
          );
          setIsFetching(false);
          setSearchResults(parsedUsers);
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    300
  );

  const handleType = async (userRegex) => {
    setSearchQuery(userRegex);
    if (userRegex.length < 3) return;
    debounced(userRegex);
  };

  const getAllChats = async () => {
    const chats = await getChats(TESTUSERID);
    setActiveUser(JSON.parse(chats)[0])
    console.log(JSON.parse(chats))
    setCurrChats(JSON.parse(chats));
  }

  useEffect(() => {
    (async () => {
      await getAllChats();
    })();
  }, []);

  return (
    <div
      className={clsx(
        "w-80 sm:relative z-[30] bg-gray-900 absolute left-0 top-0 h-full flex flex-col border-r border-gray-800",
        {
          "sm:flex hidden": !isOpen,
        }
      )}
    >
      <div className="p-4 h-[80px] flex justify-between items-center bg-gray-900">
        <div className="flex gap-4">
          <Link href="/" className="">
            <Home className="" />
          </Link>
          <h1 className="text-xl font-bold text-slate-300">3Lite Chat</h1>
        </div>
        <div className="">
          <Web3MessengerDropdown>
            <MoreVertical size={24} className="text-slate-300" />
          </Web3MessengerDropdown>
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
      <div className="p-4 h-[70px]">
        <SideBarChat handleType={handleType} />
      </div>
      <div className="flex-1 overflow-hidden">
        {searchQuery.length < 2 ? (
          <>
            <div className="px-6 h-[30px] flex items-center justify-between">
              <h2 className="text-md font-semibold tracking-tight">
                Current Chats
              </h2>
              <button 
                onClick={() => getAllChats()} 
                className="p-2 rounded-full hover:bg-gray-800"
              >
                <RotateCw size={18}/>
              </button>
            </div>
            <ScrollArea className="h-[calc(100vh-180px)]">
              <div className="space-y-2 pr-2">
                {currChats.length > 0 ? (
                  currChats.map((chat, id) => (
                    <ChatItem 
                      key={id} 
                      setActiveUser={setActiveUser} 
                      user={chat.participants.filter(
                        (user) => user._id.toString() !== TESTUSERID
                      )[0]} 
                    />
                  ))
                ) : (
                  <div className=" items-baseline gap-2 flex px-6 mt-4">

                  {/* <p className="text-left text-gray-500">No chats yet</p> */}
                  {/* search to get users */}
                  <p  className="text-left  text-gray-500">
                    search for users to chat with
                  </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </>
        ) : (
          <>
            <h2 className="mb-2 px-4 text-md font-semibold tracking-tight">
              {isFetching ? "Searching..." : "Search Results"}
            </h2>
            <ScrollArea className="h-[calc(100vh-220px)]">
              {searchResults.map((user, i) => (
                <ChatItem 
                  key={i} 
                  setActiveUser={setActiveUser} 
                  user={user} 
                />
              ))}
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

// Rest of the component remains the same...

const ChatItem = ({ user,setActiveUser }) => {
console.log({user:user?.username})
  const handleClick = () => {
    setActiveUser(user);
  }
  return (
    <div onClick={handleClick}  className="flex items-center p-4 gap-3 hover:bg-opacity-80 cursor-pointer">
      <div className="bg-orange-400 backdrop-blur-sm bg-opacity-70 size-10 rounded-full p-2">
        <PersonIcon className="size-full fill-orange-700 rounded-full text-white stroke-white" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-baseline">
          <h3 className="font-semibold text-slate-300">{user?.username}</h3>
          <span className="text-xs text-gray-500">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate">Last message here...</p>
      </div>
    </div>
  );
};

const Web3MessengerDropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setIsOpen(false);
    // Add your navigation logic here
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      onClick={toggleDropdown}
      className="relative  rounded-full hover:bg-gray-800 p-2 inline-block text-left"
      ref={dropdownRef}
    >
      <div className="size-fit">{children}</div>

      {isOpen && (
        <div className="absolute overflow-hidden right-0 mt-2 p-0 w-[180px] shrink-0 rounded-[20px] shadow-lg bg-gray-800 ring-1  ring-opacity-5 divide-y divide-gray-100 z-10">
          <div
            className=" "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              href={"/profile"}
              onClick={() => handleOptionClick("profile")}
              className="flex shrink-0 items-center px-4 py-3 text-sm text-slate-200 hover:bg-gray-700 hover:text-purple-100 w-full text-left transition-colors duration-200"
              role="menuitem"
            >
              <User className="mr-3 h-5 w-5 text-white" aria-hidden="true" />
              View Profile
            </Link>
            <button
              onClick={() => handleOptionClick("settings")}
              className="flex items-center px-4 py-3 pb-4 text-sm text-slate-200 hover:bg-gray-700 hover:text-purple-100 w-full text-left transition-colors duration-200"
              role="menuitem"
            >
              <Settings
                className="mr-3 h-5 w-5 text-white"
                aria-hidden="true"
              />
              Settings
            </button>
          </div>
          <div className="">
            <button
              onClick={() => handleOptionClick("logout")}
              className="flex items-center px-4 py-3 text-sm text-red-500 hover:bg-gray-700  w-full text-left transition-colors duration-200"
              role="menuitem"
            >
              <LogOut
                className="mr-3 h-5 w-5 text-red-500"
                aria-hidden="true"
              />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
