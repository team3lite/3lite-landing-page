"use client";
import { useState } from "react";
import { Coins, SendHorizontal, Loader2 } from "lucide-react";
import { SolLogo } from "./SolLogo";

export default function SuiSendButton({
  amount = "0",
  recipientAddress = "",
  disabled = false,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    setIsLoading(true);
    try {
      // Placeholder for Web3 transaction logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Sending ${amount} solana to ${recipientAddress}`);
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSend}
      disabled={disabled || isLoading}
      className="
        group relative 
        items-center
        gap-2
hidden
sm:flex
        px-4
        py-2
        bg-gradient-to-r
        from-teal-500
        to-blue-500
        rounded-xl
        text-white
        text-xs
        font-semibold
        shadow-lg
        hover:shadow-xl
        transition-all
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {/* Background animation */}
      <div className="absolute shrink-0  inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* Content */}
      <div className="relative  flex shrink-0 items-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="hidden sm:inline">Sending...</span>
          </>
        ) : (
          <>
            <div className="size-[20px]">
              <SolLogo className="w-5 h-5 stroke-white" />
            </div>
            <span className="hidden sm:inline shrink-0">Send Sol</span>
            <SendHorizontal className="w-4 h-4 ml-1" />
          </>
        )}
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </button>
  );
}
