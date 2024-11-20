"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import Homepage from "./pages/Homepage";


export default function Home() {
  const walletinfo = useWallet();
  console.log(walletinfo);

  return (
    <div className="">
      <Homepage />
    </div>
  );
}
