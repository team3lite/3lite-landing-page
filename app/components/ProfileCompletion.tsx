"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Upload } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { createUser } from "@/actions/dbFunctions";
import useAuth from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { uploadImage } from "@/actions/severFunctions";
import { UserDetails } from "@/providers/AuthContext";

const ProfileSetupModal = ({ isOpen }) => {
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { publicKey, connected } = useWallet();
  const { setUser } = useAuth();
  const walletDetails = {
    walletAddress: publicKey?.toBase58(),
    connectionTimestamp: new Date(),
    walletType: publicKey?.toString().startsWith("phantom")
      ? "Phantom"
      : "Solflare",
  };
  const pathname = usePathname();
  const router = useRouter();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!profileName.trim()) return;

    setIsSubmitting(true);
    try {
      // 1. Basic wallet details

      console.log({ walletDetails });
      //the user name should be the last 4 digits of the wallet address
      const formData = new FormData();
      formData.append("profile", profileImage);
      const imageUrl = JSON.parse(await uploadImage(formData)).url;

      console.log({ imageUrl });
      const newUser = await createUser({
        username: profileName,
        walletAddress: walletDetails.walletAddress,
        walletType: walletDetails.walletType,
        connectionTimestamp: walletDetails.connectionTimestamp,
        avatar: imageUrl,
      });

      setUser(JSON.parse(newUser));
      // setUser(newUser);
      router.push("/chat");
      console.log({ newUser });
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogOverlay className="bg-black/80" />
      <AlertDialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-slate-900 border border-slate-800 max-w-md rounded-lg shadow-lg">
        <AlertDialogHeader className="p-6 pb-0">
          <AlertDialogTitle className="text-xl font-semibold text-white">
            Complete Your Profile
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-6 p-6">
          <div className="text-sm text-slate-400 bg-slate-800/50 p-3 rounded-md">
            Connected Wallet: {walletDetails.walletAddress?.slice(0, 6)}...
            {walletDetails.walletAddress?.slice(-4)}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileName" className="text-slate-200 block">
              Profile Name
            </Label>
            <Input
              id="profileName"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="w-full bg-slate-800 border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your display name"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-200 block">Profile Picture</Label>
            <div className="flex items-center justify-center">
              <div className="relative group">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-dashed border-slate-600 flex items-center justify-center hover:border-indigo-500 transition-colors">
                    <Upload className="w-8 h-8 text-slate-400" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!profileName.trim() || isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="contents">
                Saving... <Loader2Icon className="animate-spin" />
              </div>
            ) : (
              "Complete Setup"
            )}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProfileSetupModal;
