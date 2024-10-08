import React from "react";

const TestimonialCard = ({ title, name, description }) => {
  return (
    <div className="md:w-[650px] sm:w-[530px] w-[300px]    sm:h-[300px]  h-[420px] rounded-3xl p-[1px] bg-gradient-to-b from-white to-brand     ">
      <div className="rounded-3xl   overflow-hidden h-full   bg-brand-light">
        <div
          style={{
            // boxShadow: " 0px 0px 100px 0px #140F2A",

            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(0, 0, 0, 0.0) 40deg, rgba(36, 26, 65, 0.65) 70deg, rgba(54, 39, 104, 0.21) 260deg, rgba(73, 53, 110, 0.30) 269deg, rgba(0, 0, 0, 0.00) 350deg), rgba(43, 38, 68, 0.40)",
          }}
          className="font-syne   py-10  h-full  bg-opacity-30 bg-[#070322]  backdrop-blur-3xl  rouned-2xl  text-white font-normal sm:text-lg text-sm   "
        >
          <div className="w-full flex   flex-col h-full justify-between">
            <div className="flex   flex-col gap-y-4">
              <h2 className="text-center font-Poppins  sm:px-10 px-4  md:text-3xl font-semibold text-2xl   md:font-medium text-white">
                {title}
              </h2>
              <p className="text-base px-10 text-pretty text-opacity-70  font-Poppins font-light  text-white text-center ">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// embla__slide
export default TestimonialCard;
