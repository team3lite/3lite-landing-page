"use client";
import { getUserByWalletAddress } from "@/actions/dbFunctions";
import useAuth from "@/hooks/useAuth";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileSetupModal from "./ProfileCompletion";

const WalletConnectionHandler = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  console.log({ pathname });
  const { publicKey, connected } = useWallet();
  const { setUser } = useAuth();

  useEffect(() => {
    const storeWalletDetails = async () => {
      if (connected && publicKey) {
        try {
          // 1. Basic wallet details
          const walletDetails = {
            walletAddress: publicKey.toBase58(),
            connectionTimestamp: new Date(),
            walletType: publicKey.toString().startsWith("phantom")
              ? "Phantom"
              : "Solflare",
          };

          const userExist = await getUserByWalletAddress(
            walletDetails.walletAddress
          );
          console.log({ userExist });
          if (userExist) {
            setUser(JSON.parse(userExist));
            if (pathname == "/login" || pathname == "/signup") {
              router.push("/chat");
            }
            return;
          } else {
            setIsOpen(true);
          }

          console.log("Wallet details stored successfully");
        } catch (error) {
          console.error("Error storing wallet details:", error);
        }
      }
    };

    storeWalletDetails();
  }, [publicKey, connected]);

  return (
    <div>
      <ProfileSetupModal isOpen={isOpen} />
      <WalletMultiButton />
    </div>
  );
};
export default WalletConnectionHandler;
