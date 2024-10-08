"use client";
import React, { useState, useEffect, useCallback } from "react";

import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { getMod } from "../lib/modulus";
import useEmblaContext from "../hooks/useEmblaContext";
import FeaturesCard from "./FeaturesCard";
import { FeaturesDetails } from "../data";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { clickNext, clickPrev, setSlide } = useEmblaContext();

  const [currSlide, setCurrSlide] = useState({
    currSlide: 1,
    nextSlide: 2,
    prevSlide: 0,
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  const nextSkewClass = " skew-y-[-15deg] origin-left";
  const genSkewClass = " skew-y-0";
  const prevSkewClass = " skew-y-[15deg] origin-right";

  const logSlidesInView = useCallback((emblaApi) => {
    const totalSlides = slides.length;
    const currStartId = getMod(emblaApi.selectedScrollSnap() + 1, totalSlides);
    console.log({ currStartId });
    setSlide(currStartId);

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
    setCurrSlide(() => ({
      currSlide: currStartId,
      nextSlide: nextElement,
      prevSlide: prevElement,
    }));

    const prevId = document.getElementById(`car${prevElement}`);
    const nextId = document.getElementById(`car${nextElement}`);
    const genId = document.getElementById(`car${currStartId}`);
    const prePrevId = document.getElementById(
      `car${getMod(prevElement - 1, totalSlides)}`
    );
    const afterNextId = document.getElementById(
      `car${getMod(nextElement + 1, totalSlides)}`
    );

    genId.style.transform = "skewY(0)";
    genId.classList.add("genRef");
    genId.classList.remove("nextRef");
    genId.classList.remove("prevRef");
    nextId.classList.add("nextRef");
    nextId.classList.remove("genRef");
    prevId.classList.add("prevRef");
    prevId.classList.remove("genRef");

    nextId.style.transform = "skewY(-15deg)";
    nextId.style.transition = "transform 0.5s";
    prevId.style.transition = "transform 0.5s";
    genId.style.transition = "transform 0.5s";
    nextId.style.transformOrigin = "left";
    //skew afternext and translate y
    afterNextId.style.transform = "skewY(-20deg) translateY(-10%)";
    afterNextId.style.transformOrigin = "left";
    afterNextId.style.transition = "transform 0.5s";

    prevId.style.transform = "skewY(15deg)";
    prevId.style.transformOrigin = "right";
    prePrevId.style.transform = "skewY(20deg) translateY(-10%)";
    prePrevId.style.transformOrigin = "right";
  }, []);
  useEffect(() => {
    if (emblaApi) {
      console.log("emblaApi changed");
      emblaApi.on("select", logSlidesInView);
      const currStartId = emblaApi.selectedScrollSnap();
      const prevStartId = emblaApi.previousScrollSnap();

      if (prevStartId === 0 && currStartId === slides.length - 1) {
        clickPrev();
      } else if (prevStartId === slides.length - 1 && currStartId === 0) {
        clickNext();
      } else {
        if (currStartId > prevStartId) {
          clickNext();
        } else {
          clickPrev();
        }
      }
    }
  }, [emblaApi, logSlidesInView]);
  useEffect(() => {
    if (emblaApi) {
      console.log("emblaApi changed");

      const currStartId = emblaApi.selectedScrollSnap();
      const prevStartId = emblaApi.previousScrollSnap();

      if (prevStartId === 0 && currStartId === slides.length - 1) {
        clickPrev();
      } else if (prevStartId === slides.length - 1 && currStartId === 0) {
        clickNext();
      } else {
        if (currStartId > prevStartId) {
          clickNext();
        } else {
          clickPrev();
        }
      }
    }
  }, [emblaApi, currSlide.currSlide]);
  return (
    <section className="embla z-2 features max-w-[62rem] min-[1364px]:max-w-[68rem]">
      <div className="embla__viewport pt-6 sm:pt-[30px]" ref={emblaRef}>
        <div className="embla__container  pt-6 sm:pt-36 ">
          {slides.map((index) => (
            <div className="embla__slide relative" key={index}>
              <FeaturesCard
                id={`car${index}`}
                features={
                  FeaturesDetails[getMod(index + 1, FeaturesDetails.length)]
                }
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
      <div className=" absolute sm:top-[calc(50%_-_50px)] top-[calc(50%_+_10px)] size-[80px] flex justify-center items-center sm:-left-[70px]  -left-20  ">
        <PrevButton
          className="size-16 p-4 z-[10]  "
          onClick={() => {
            console.log("prev clicked");
            onPrevButtonClick();
          }}
          disabled={prevBtnDisabled}
        />
      </div>
      <div className=" absolute sm:top-[calc(50%_-_50px)] top-[calc(50%_+_10px)] size-[80px] flex justify-center items-center sm:-right-16  -right-20  ">
        <NextButton
          className="size-16 p-4 "
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        />
      </div>
    </section>
  );
};

export default EmblaCarousel;
