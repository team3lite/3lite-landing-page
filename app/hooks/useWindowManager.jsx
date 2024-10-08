"use client";

const useWindowManager = () => {
  const getScreenMatch = ({ smallStyle, mediumStyle, largeStyle }) => {
    const isSmallScreen = window.matchMedia("(max-width: 600px)");
    const isMediumScreen = window.matchMedia(
      "(min-width: 601px) and (max-width: 1024px)"
    );
    const isLargeScreen = window.matchMedia(
      "(min-width: 1025px) and (max-width: 1440px)"
    );
    if (isSmallScreen.matches) {
      return smallStyle;
    } else if (isMediumScreen.matches) {
      return mediumStyle;
    } else if (isLargeScreen.matches) {
      return largeStyle;
    } else {
      return largeStyle;
    }
  };
  return {
    getScreenMatch,
  };
};

export default useWindowManager;
