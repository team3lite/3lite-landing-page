"use client";

import { EmblaContext } from "../context/emblaContext";
import { use } from "react";

const useEmblaContext = () => {
  const {
    clickNext,
    key,
    currSlide,
    setCurrSlide,
    clickPrev,
    setNextBtnFxn,
    setPrevBtnFxn,
  } = use(EmblaContext);

  return {
    clickNext,
    key,
    clickPrev,
    setNextBtnFxn,
    setPrevBtnFxn,
    currSlide,
    setSlide: setCurrSlide,
  };
};

export default useEmblaContext;
