"use client";
import { FeaturesDetails } from "../data";
import useEmblaContext from "../hooks/useEmblaContext";
import { getMod } from "../lib/modulus";
import React from "react";

const BottomDots = () => {
  const { currSlide } = useEmblaContext();
  const activeClass = "bg-white w-[100px] ";
  const inactiveClass = "bg-white/20  w-10";

  const currId = getMod(currSlide + 1, FeaturesDetails.length);

  return (
    <div className="Frame47405 h-[5px] justify-start items-center gap-1 inline-flex">
      {FeaturesDetails.map((_, index) => {
        return (
          <div
            key={index}
            className={`Rectangle89
              transition-all duration-300
              h-[5px] ${
                index === currId ? activeClass : inactiveClass
              } rounded-[99px]`}
          />
        );
      })}
    </div>
  );
};

export default BottomDots;
