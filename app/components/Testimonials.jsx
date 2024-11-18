"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import Testimonial from "./Cards/Testimonial";
import { testimonials } from "../utils/constants";
import TestimonialCard from "./Cards/TestimonialCard";
import MapComponent from "./MapComponent";
import { getMod } from "../lib/modulus";

const Testimonials = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const updateCurrSlide = useCallback((emblaApi) => {
    if (!emblaApi) return;
    setCurrSlide(emblaApi.selectedScrollSnap());
  }, []);
  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    setIsPlaying(autoplay.isPlaying());
    emblaApi
      .on("autoplay:play", () => setIsPlaying(true))
      .on("autoplay:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoplay.isPlaying()))
      .on("select", updateCurrSlide);
  }, [emblaApi]);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col sm:gap-y-[6rem] gap-y-10 mt-[5rem]">
        <div className="relative">
          <div className="embla testimonials mx-20">
            <div className="embla__viewport " ref={emblaRef}>
              <div className="embla__container gap-x-5">
                {testimonials.map((slide, index) => (
                  <div
                    className={index === testimonials.length - 1 ? "mr-5" : ""}
                    key={index}
                  >
                    <TestimonialCard
                      title={slide.title}
                      description={slide.description}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex justify-center mt-[100px]">
              <BottomDots
                currSlide={currSlide}
                noSlides={testimonials.length}
              />
            </div>
          </div>
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

const BottomDots = ({ currSlide, noSlides }) => {
  const activeClass = "bg-white w-[100px] ";
  const inactiveClass = "bg-white/20  w-10";

  const currId = getMod(currSlide + 1, noSlides);

  return (
    <div className="Frame47405 h-[5px] justify-start items-center gap-1 inline-flex">
      {Array.from({ length: noSlides }).map((_, index) => {
        return (
          <div
            key={index}
            className={`Rectangle89
              transition-all duration-300
              h-[5px] ${index === currId ? activeClass : inactiveClass
              } rounded-[99px]`}
          />
        );
      })}
    </div>
  );
};
