"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PasswordInput = ({ id, type, className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full flex max-w-sm">
      <Input
        type={showPassword ? "text" : "password"}
        value={password}
        id={id}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        className={cn("pr-10 py-0 m-0", className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute  justify-center outline-none bg-transparent hover:bg-transparent inset-y-0 right-0 pr-3 flex items-center"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <EyeOff className="h-6 w-6 text-gray-200 sm:text-gray-700" />
        ) : (
          <Eye className="h-6 w-6  text-gray-200 sm:text-gray-700" />
        )}
      </Button>
    </div>
  );
};

export default PasswordInput;
