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
import { Upload } from "lucide-react";

const ProfileSetupModal = ({ walletAddress, isOpen, onComplete }) => {
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
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
      // Here you would typically:
      // 1. Upload the image to your storage
      // 2. Save the profile data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onComplete({ profileName, profileImage });
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogOverlay className="bg-black/80" />
      <AlertDialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-slate-900 border border-slate-800 max-w-md rounded-lg shadow-lg">
        <AlertDialogHeader className="p-6 pb-0">
          <AlertDialogTitle className="text-xl font-semibold text-white">
            Complete Your Profile
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-6 p-6">
          <div className="text-sm text-slate-400 bg-slate-800/50 p-3 rounded-md">
            Connected Wallet: {walletAddress?.slice(0, 6)}...
            {walletAddress?.slice(-4)}
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
            {isSubmitting ? "Saving..." : "Complete Setup"}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProfileSetupModal;
