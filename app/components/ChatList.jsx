"use client";
import { Coins, Mic, Paperclip, Send, Smile } from "lucide-react";
import { useState } from "react";

const ChatList = () => {
  const [chats, setChats] = useState([
    {
      id: 1,
      message: "Welcome to Suift Messenger",
      time: "12:34 PM",
      type: "received",
    },
    {
      id: 2,
      message:
        "Experience secure, decentralized communication built on the Sui Blockchain",
      time: "12:34 PM",
      type: "received",
    },
    {
      id: 3,
      type: "sent",
      message: "tell me more",
      time: "12:34 PM",
    },
    {
      id: 4,
      type: "sent",
      message:
        "Suif Messenger is a decentralized chat application built on the Sui blockchain",
      time: "12:34 PM",
    },
    {
      id: 5,
      type: "received",
      message: "And it is still under development",
      time: "12:34 PM",
    },
  ]);
  console.log({ chats });

  const simulateResponse = async (currChats) => {
    const response = await fetch(
      "https://api.chucknorris.io/jokes/random?category=dev"
    );
    const data = await response.json();
    setChats([
      ...currChats,
      {
        id: crypto.getRandomValues(new Uint32Array(1))[0],
        message: data.value,
        time: "12:34 PM",
        type: "received",
      },
    ]);
    //scroll to the bottom of the chat container
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };
  const handleSend = async () => {
    const message = document.getElementById("message").value;
    if (!message) return;

    setChats([
      ...chats,
      {
        id: crypto.getRandomValues(new Uint32Array(1))[0],
        message,
        time: "12:34 PM",
        type: "sent",
      },
    ]);
    document.getElementById("message").value = "";
    //scroll to the bottom of the chat container
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.scrollTop = chatContainer.scrollHeight;
    setTimeout(async () => {
      await simulateResponse([
        ...chats,
        {
          id: crypto.getRandomValues(new Uint32Array(1))[0],
          message,
          time: "12:34 PM",
          type: "sent",
        },
      ]);
    }, 1000);
  };
  return (
    <div className="flex  flex-col w-full  relative  h-full">
      <div
        id="chatContainer"
        className="flex-1  flex hide-scrollbar  flex-col  h-full  overflow-hidden  relative overflow-y-auto p-4 space-y-2"
      >
        {chats.map((chat, i) => (
          <div
            key={i}
            className={` flex ${chat.type === "sent" ? "justify-end" : ""}`}
          >
            <div
              className={`sm:max-w-xs max-w-[90%] ${
                chat.type === "sent" ? "bg-purple-900" : "bg-gray-800"
              } rounded-lg p-3`}
            >
              <p className="font-suse text-sm">{chat.message}</p>
              <p className="text-xs text-gray-500 mt-1 text-right">
                {chat.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4  h-fit w-full place-content-center flex pt-1 bg-ray-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="w-full "
        >
          <div className="flex w-full items-center bg-gray-950 px-3 rounded-full">
            <div className="flex w-fit items-center sm:space-x-2 space-x-2 ">
              <button className="sm:p-2 rounded-full hover:bg-gray-700">
                <Smile size={20} className="text-purple-600" />
              </button>
              <button className="sm:p-2 rounded-full hover:bg-gray-700">
                <Coins size={20} className="text-purple-600" />
              </button>
            </div>
            <input
              type="text"
              id="message"
              placeholder="Type a message"
              className="flex-1 w-full bg-transparent p-3 focus:outline-none text-gray-300"
            />
            <div className="flex items-center w-fit space-x-2 sm:px-3 ">
              <button className="sm:p-2 rounded-full hover:bg-gray-700">
                <Paperclip size={20} className="text-purple-600" />
              </button>
              <button className="sm:p-2 p-0 rounded-full hidden sm:inline hover:bg-gray-700">
                <Mic size={20} className="text-purple-600" />
              </button>
              <button
                onClick={handleSend}
                className="p-2 rounded-full bg-purple-800 hover:bg-purple-900"
              >
                <Send size={20} className="text-gray-200" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatList;
