"use client";
import {
  addMessage,
  getChat,
  getChats,
  getUserIdFromUsername,
} from "@/actions/dbFunctions";
import { FirebaseChat } from "@/class/firebase_chat";
import useAuth from "@/hooks/useAuth";
import { useChatContext } from "@/hooks/useChatContext";
import {
  Coins,
  Mic,
  Paperclip,
  Send,
  Smile,
  Timer,
  TriangleAlert,
} from "lucide-react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  useOptimistic,
  startTransition,
  useCallback,
} from "react";
import mongoose from "mongoose";

const ChatList = () => {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [_, setIsLoading] = useState(true);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage:any) => {
      // Remove any existing message with the same tempId
      console.log({ newMessage });
      const filteredState = state.filter(msg => msg._id !== newMessage.tempId);
      return [...filteredState, newMessage];
    }
  );

  const { activeUser } = useChatContext();
  const { activeUser: user } = useAuth();

  // Initialize chat effect remains the same...
  useEffect(() => {
    let isMounted = true;

    const initializeChat = async () => {
      try {
        setIsLoading(true);

        if (!activeUser?._id) return;
        const chatData = await getChat(user._id, activeUser._id);
        const parsedChat = JSON.parse(chatData);

        if (!parsedChat?._id) {
          setChatId(null);
          setMessages([]);
          return;
        }

        if (isMounted) {
          setChatId(parsedChat._id);
        }
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeChat();

    return () => {
      isMounted = false;
    };
  }, [activeUser?.username]);

  // Updated Firebase subscription with proper timestamp handling
  useEffect(() => {
    let unsubscribe = null;

    const setupFirebaseSubscription = async () => {
      if (!chatId) return;

      unsubscribe = FirebaseChat.subscribeToChat(chatId, setMessages);
    };

    setupFirebaseSubscription();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [chatId]);

  const handleSend = async () => {
    const messageInput = document.getElementById("message") as HTMLInputElement;
    const message = messageInput?.value?.trim();

    if (!message || !activeUser?.username) return;
    const tempId = new mongoose.Types.ObjectId().toString();
    // Create optimistic message with timestamp as Date object
    const timestamp = new Date();
    const optimisticMessage = {
      _id: tempId,
      tempId,
      content: message,
      sender: user._id,
      contentType: "text",
      receiver: activeUser._id,
      timestamp, // Store as Date object for optimistic message
      deliveryStatus: "sending",
    };

    // Clear input and add optimistic message immediately
    messageInput.value = "";
    addOptimisticMessage(optimisticMessage);

    startTransition(async () => {
      try {
        const resp = await addMessage({
          id:tempId,
          chatId,
          timestamp,
          sender: user._id,
          receiver: activeUser._id,
          message,
        });
        if (!chatId) {
          setChatId(JSON.parse(resp).chat._id);
        }
      
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    });
  };

  return (
    <div className="flex flex-col w-full relative h-full">
      <div
        id="chatContainer"
        className="flex-1 flex hide-scrollbar flex-col h-full overflow-hidden relative overflow-y-auto p-4 space-y-2"
      >
        {optimisticMessages.map((message, i) => (
          <div
            key={message._id || i}
            className={`flex ${
              message.sender === user._id ? "justify-end" : ""
            }`}
          >
            <div
              className={`sm:max-w-xs max-w-[90%] ${
                message.sender === user._id ? "bg-purple-900" : "bg-gray-800"
              } rounded-lg p-3`}
            >
              <p className="font-suse text-sm">{message.content}</p>
              <p className="text-xs text-gray-500 mt-1 text-right">
                {new Date(message.timestamp).toLocaleTimeString()}
                {message.status === "sending" && (
                  <Timer size={12} className="inline-block ml-1" />
                )}
                {message.status === "failed" && (
                  <TriangleAlert size={12} className="inline-block ml-1" />
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 h-fit w-full place-content-center flex pt-1 bg-ray-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          id="chatForm"
          className="w-full"
        >
          <div className="flex w-full items-center bg-gray-950 px-3 rounded-full">
            <div className="flex w-fit items-center sm:space-x-2 space-x-2">
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
              autoComplete="off"
              placeholder="Type a message"
              className="flex-1 w-full bg-transparent p-3 focus:outline-none text-gray-300"
            />
            <div className="flex items-center w-fit space-x-2 sm:px-3">
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
