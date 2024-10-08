"use client";
import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";

import useEmblaCarousel from "embla-carousel-react";
import { getMod } from "../lib/modulus";
import useEmblaContext from "../hooks/useEmblaContext";
import FeaturesShadowCard from "./FeaturesShadowCard";
import useWindowManager from "../hooks/useWindowManager";

const EmblaCarouselRev = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { getScreenMatch } = useWindowManager();
  const { setNextBtnFxn, setPrevBtnFxn, key } = useEmblaContext();

  const nextSkewClass =
    " sm:skew-y-[15deg] skew-y-[2deg]  translate-y-[10px]sm:translate-y-[0px] origin-right";

  const genSkewClass =
    " skew-y-0 sm:translate-y-[-85px] translate-y-[-20px]   ";
  const prevSkewClass =
    " sm:skew-y-[-15deg] skew-y-[-2deg] translate-y-[10px] sm:translate-y-[0px] origin-left";

  const logSlidesInView = useCallback((emblaApi) => {
    const totalSlides = slides.length;
    const currStartId = getMod(emblaApi.selectedScrollSnap() + 1, totalSlides);

    var prevElement, nextElement;
    if (currStartId <= 0) {
      nextElement = 1;
      prevElement = getMod(totalSlides - 1, totalSlides);
    } else if (currStartId >= totalSlides - 1) {
      nextElement = 0;
      prevElement = getMod(totalSlides - 2, totalSlides);
    } else {
      nextElement = getMod(currStartId + 1, totalSlides);
      prevElement = getMod(currStartId - 1, totalSlides);
    }

    const prevcarRevId = document.getElementById(`carRev${prevElement}`);
    const nextcarRevId = document.getElementById(`carRev${nextElement}`);
    const gencarRevId = document.getElementById(`carRev${currStartId}`);
    const prePrevRevId = document.getElementById(
      `carRev${getMod(prevElement - 1, totalSlides)}`
    );
    const afterNextRevId = document.getElementById(
      `carRev${getMod(nextElement + 1, totalSlides)}`
    );

    prePrevRevId.style.transform = `skewY(2deg) ${getScreenMatch({
      smallStyle: "translateY(-2%)",
      mediumStyle: "translateY(-10%)",
      largeStyle: "translateY(-10%)",
    })}`;
    prePrevRevId.style.transformOrigin = "left";
    prePrevRevId.style.transition = "transform 1s";
    afterNextRevId.style.transition = "transform 1s";

    afterNextRevId.style.transform = `skewY(-2deg) ${getScreenMatch({
      smallStyle: "translateY(-1%)",
      mediumStyle: "translateY(-10%)",
      largeStyle: "translateY(-10%)",
    })}`;
    afterNextRevId.style.transformOrigin = "right";

    gencarRevId.style.transition = "transform 1s";
    prevcarRevId.style.transition = "transform 1s";
    nextcarRevId.style.transition = "transform 1s";

    gencarRevId.style.transform = getScreenMatch({
      smallStyle: "translateY(-20px)",
      mediumStyle: "translateY(-85px)",
      largeStyle: "translateY(-85px)",
    });
    nextcarRevId.style.transform = getScreenMatch({
      smallStyle: "skewY(4deg) translateY(10px)",
      mediumStyle: "skewY(15deg)",
      largeStyle: "skewY(15deg)",
    });
    prevcarRevId.style.transform = getScreenMatch({
      smallStyle: "skewY(-4deg)  translateY(10px)",
      mediumStyle: "skewY(-15deg)",
      largeStyle: "skewY(-15deg)",
    });
    prevcarRevId.style.transformOrigin = "left";
    nextcarRevId.style.transformOrigin = "right";
  }, []);
  useEffect(() => {
    if (emblaApi) {
      setNextBtnFxn({
        fxn: () => {
          console.log("newnextfxd");
          emblaApi.scrollPrev();
        },
      });
      setPrevBtnFxn({
        fxn: () => {
          emblaApi.scrollNext();
        },
      });
      emblaApi.on("select", logSlidesInView);
    }
  }, [emblaApi, logSlidesInView]);

  return (
    <section
      id="rev"
      className="embla features pb-[110px]  w-fit   max-w-[62rem] min-[1364px]:max-w-[68rem]"
    >
      <div className="embla__viewport pt-5 sm:pt-[90px]" ref={emblaRef}>
        <div className="embla__container  ">
          {slides.map((index) => (
            <div className="embla__slide relative" key={index}>
              <FeaturesShadowCard
                id={`carRev${index}`}
                className={`embla__slide__number  ${
                  index == 1
                    ? genSkewClass
                    : index == 2
                    ? nextSkewClass
                    : index == 0
                    ? prevSkewClass
                    : null
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarouselRev;
