import CommunityPage from "./CommunityPage";
import "../embla.css";

import CarouselWrapper from "./CarouselWrapper";
import FaqSection from "./FaqSection";
import HeaderComponent from "./HeaderComponent";

const Features = () => {
  return (
    <div className="mb-9 w-full overflow-hidden">
      <div className="  w-full overflow-hidden   pb-[100px] relative">
        <div className="w-full relative">
          <CarouselWrapper />
        </div>
      </div>
      <div className="px-[120px] flex justify-center  w-full">
        <CommunityPage />
        {/* add a blur glow here */}
      </div>
    </div>
  );
};

export default Features;
