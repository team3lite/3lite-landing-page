import EmblaCarousel from "./EmblaCarousel";

import EmblaCarouselRev from "./EmbleCarouselRev";
import { EmblaContextProvider } from "../context/emblaContext";
import BottomDots from "./BottomDots";
import MattedBackground from "./MattedBackground";

const OPTIONS = {
  loop: true,
  align: "start",
};
const SLIDE_COUNT = 6;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const CarouselWrapper = () => {
  return (
    <EmblaContextProvider>
      <div className="px-[80px] sm:px-[80px] flex flex-col item-center">
        <div className="relative flex justify-center">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          <div className="absolute w-full z-[-10] h-full top-0 left-0 justify-center items-start flex">
            <EmblaCarouselRev slides={SLIDES} options={OPTIONS} />
          </div>
        </div>
        <div className="sm:mt-[100px] mt-[50px] w-full flex justify-center">
          <BottomDots />
        </div>
      </div>
      <div className="relative   w-full z-[-1] h-full top-0 left-0 justify-center items-start flex">
        <MattedBackground width={1600} height={290} />
      </div>
    </EmblaContextProvider>
  );
};

export default CarouselWrapper;
