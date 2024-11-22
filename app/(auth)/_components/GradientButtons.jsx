// "use client";
import { Button } from "@/components/ui/button";

const GradientButtons = ({ text, children, ...props }) => {
  const gradientColors = ["#F5F5F5", "#C71585", "#8B008B", "#4B0082"];
  return (
    <div
      {...props}
      className="w-full  h-[40px]  rounded-lg p-[0.8px]  bg-gradient-to-t from-slate-600 from-0% to-slate-400 to-100%   "
    >
      <div
        className={` w-full h-full
      relative bg-clip-content   overflow-hidden rounded-lg g-[#4B0082]  transition-all duration-300
      hover:scale-105 px-20  focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
    `}
        style={{
          background:
            "conic-gradient(from 270deg at 50% 50%, #4B0082 0deg, #C71585 48.25deg, #4B0082 260deg)",
        }}
      >
        <span className="" id="dds">
          {children}
        </span>
        <span className="relative text-left bg-n-200 grow  px-4 py-3 font-medium text-white text-sm">
          {text}
        </span>
      </div>
    </div>
  );
};

export default GradientButtons;
