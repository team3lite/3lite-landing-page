import React from "react";
import BackgroundSvg from "./BackgroundSvg";

const MattedBackground = ({ width, height }) => {
  return (
    <div className="w-fit scale-[0.5] sm:scale-100  opacity-50 sm:-mt-[74px] -mt-[110px] ">
      <BackgroundSvg width={width} height={height} />
    </div>
  );
};

export default MattedBackground;
