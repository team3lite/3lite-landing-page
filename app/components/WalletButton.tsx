"use client"
import { createUser } from "@/actions/dbFunctions";
import useAuth from "@/hooks/useAuth";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

const WalletConnectionHandler = () => {
    const { publicKey, connected } = useWallet();
    const [userData, setUserData] = useState<{
      walletAddress?: string;
      connectionTimestamp?: Date;
    }>({});
  const {setUser}= useAuth()
    useEffect(() => {
      const storeWalletDetails = async () => {
        if (connected && publicKey) {
          try {
            // 1. Basic wallet details
            const walletDetails = {
              walletAddress: publicKey.toBase58(),
              connectionTimestamp: new Date(),
              walletType: publicKey.toString().startsWith('phantom') ? 'Phantom' : 'Solflare'
            };
  
                console.log({walletDetails})
                //the user name should be the last 4 digits of the wallet address
                const newUser=await createUser({
                  username:walletDetails.walletAddress.slice(-4),
                  walletAddress: walletDetails.walletAddress,
                  walletType: walletDetails.walletType,
                  connectionTimestamp: walletDetails.connectionTimestamp
                })
                setUser(JSON.parse(newUser))
                console.log({newUser})
            // 2. Store in database
            // const storedUser = await db.user.upsert({
            //   where: { walletAddress: walletDetails.walletAddress },
            //   update: {
            //     lastConnectionTimestamp: walletDetails.connectionTimestamp
            //   },
            //   create: {
            //     walletAddress: walletDetails.walletAddress,
            //     connectionTimestamp: walletDetails.connectionTimestamp,
            //     walletType: walletDetails.walletType
            //   }
            // });
  
            // 3. Update local state
            // setUserData({
            //   walletAddress: storedUser.walletAddress,
            //   connectionTimestamp: storedUser.connectionTimestamp
            // });
  
            console.log('Wallet details stored successfully');
          } catch (error) {
            console.error('Error storing wallet details:', error);
          }
        }
      };
  
      storeWalletDetails();
    }, [publicKey, connected]);
  
    return (
      <div>
        <WalletMultiButton />
       
          
      </div>
    );
  };
  export default WalletConnectionHandler;