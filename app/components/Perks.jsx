import React from "react";
import bgCircle from "../assets/images/perks/bg-circle.png";
import bgHorizontalLine from "../assets/images/perks/bg-horizontal-line.png";
import bgVerticalLine from "../assets/images/perks/bg-vertical-line.png";
import Image from "next/image";
import PerkCard from "./Cards/PerkCard";
import { perks } from "../utils/constants";
import HeaderComponent from "./HeaderComponent";

const Perks = () => {
  return (
    <section className="w-full h-full py-[3rem] lg:mb-[30rem] bg-brand/20">
      <div className="w-full h-full">
        <div className="px-5">
          <div className="md:hidden">
            <HeaderComponent title="Secure Messaging for the Decentralized Future" />
          </div>
          <h1 className="hidden md:block text-[60px] font-medium leading-[72px] text-center gradient-text">
            Secure Messaging for <br /> the Decentralized Future
          </h1>
        </div>

        <div className="mt-[2rem] w-full">
          <div className="w-full h-full relative ">
            <div className="w-full flex justify-center relative">
              <div>
                <Image
                  src={bgCircle}
                  className="w-[144.77px] h-[143.85px]"
                  alt="bg-circle"
                />
              </div>
              <div className="absolute -z-10 top-[50%]">
                <Image
                  src={bgHorizontalLine}
                  className="w-[925.17px] "
                  alt="bg-horizontal-line"
                />
              </div>
              <div className="absolute -z-10 top-[50%]">
                <Image
                  src={bgVerticalLine}
                  className="h-[462.5px] w-auto"
                  alt="bg-horizontal-line"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative bgred-200 w-full flex justify-center">
          <div className="flex relative bg-geen-200 flex-col lg:flex-row gap-y-10 lg:gap-y-0 px-5 lg:px-0 justify-between bg-red lg:w-[1055.17px] min-[1300px]:w-[1255] lg:h-[24rem]">
            <div className="w-fit lg:absolute lg:top-[10%] lg:-left-[30px] lg:-[30%] mt-16">
              <div className="">
                <PerkCard
                  title={perks[0].title}
                  description={perks[0].description}
                />
              </div>
            </div>
            <div className="w-fit transform-none lg:translate-x-[-50%] lg:absolute left-[50%]  lg:top-[70%] lg:-[30%]">
              <div className="">
                <PerkCard
                  title={perks[1].title}
                  description={perks[1].description}
                />
              </div>
            </div>
            <div className="w-fit lg:absolute lg:-right-[30px] lg:top-[10%] lg:mt-16 lg:-[28%]">
              <div className="">
                <PerkCard
                  title={perks[2].title}
                  description={perks[2].description}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perks;
