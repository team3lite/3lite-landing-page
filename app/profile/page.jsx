import Navbar from "@/components/Navbar";
import React from "react";

import GrainyBackground from "@/components/GrainyBackground";
import ProfileDetails from "@/components/ProfileDetails";

const page = () => {
  return (
    <main>
      <Navbar />
      <div className="min-h-scrmeen h-full bg-black">
        <GrainyBackground className="w-full bg-gray-950 h-[100%]">
          {/* Main Container */}
          <ProfileDetails />
        </GrainyBackground>
      </div>
    </main>
  );
};

export default page;
