import React from "react";
import bgImage from "../assets/images/hero-bg.png";
import Image from "next/image";
import Navbar from "./Navbar";
import HorizontalInfoScroll from "./HorizontalInfoScroll";
import blockImage from "../assets/images/block.png";
import HeroOverlay from "./HeroOverlay";

const HeroEdited = () => {
  return (
    <section className="lg:h-[150dvh] bg-brand">
      <div className="w-full h-full">
        <div className="relative h-full w-full">
          <div className="relative w-full h-full z-10">
            <div className="absolute -z-[1] h-full w-full">
              <HeroOverlay />
            </div>
            <div>
              <Navbar />
            </div>
            <div className="flex md:h-[500px] items-center justify-center flex-col gap-y-7 mt-5">
              <div
                style={{
                  WebkitTextFillColor: "transparent",
                }}
                className="bg-gradient-to-b from-[#FFFFFF] to-slate-600 bg-clip-text text-5xl max-w-[90%] min-w-[300px] sm:text-6xl  lg:text-[80px] lg:leading-[84px]  font-Syne font-normal text-center capitalize "
              >
                <h1>
                  Secure Messaging for the Decentralized Future
                </h1>
              </div>

              <p className="text-white font-Poppins text-lg md:text-base sm:leading-[32.4px] sm:text-[24px] w-[300px] md:w-1/2 sm:w-[500px] font-extralight text-center">
                Building a decentralized world with the future of secure world of messaging for both new users and old users
              </p>

              <div className="flex flex-col md:flex-row gap-3">
                <button className="bg-brand-light px-4 py-2 rounded-lg">Launch Bot</button>
                <button className="bg-[#C2C0F3] px-4 py-2 rounded-lg text-brand">Join community</button>
              </div>
            </div>
            <div className="mt-[13rem] ">
              <HorizontalInfoScroll />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroEdited;
