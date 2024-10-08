import React from "react";
import MapSvg from "./MapSvg";

type Props = {};

const MapComponent = (props: Props) => {
  return (
    <div className="absolute  overflow-hidden h-[600px] z-[-1] top-0 left-0 w-full flex justify-center">
      <div className="relative w-full h-full">
        <div className="w-full top-0 left-0 absolute flex justify-center">
          <div className="w-fit">
            <MapSvg />
          </div>
        </div>
        <div className="w-full -bottom-[290px] bg-rd-50 left-0 flex absolute  justify-center">
          <div className="w-fit  ">
            <OverlayMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;

const OverlayMap = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1440"
      height="650"
      fill="none"
      viewBox="0 0 1440 650"
    >
      <g filter="url(#a)">
        <path fill="#080471" d="M0 150h1440v350H0z" />
      </g>
      <defs>
        <filter
          id="a"
          width="1740"
          height="650"
          x="-150"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_143_1269"
            stdDeviation="75"
          />
        </filter>
      </defs>
    </svg>
  );
};
