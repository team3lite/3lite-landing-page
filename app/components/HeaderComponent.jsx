import React from "react";

const HeaderComponent = ({ title }) => {
  return (
    <div
      style={{
        WebkitTextFillColor: "transparent",
      }}
      className="bg-gradient-to-b from-[#FFFFFF] to-slate-600 bg-clip-text p-5 mb-2 sm:mb-5 max-w-[600px] mx-auto text-center flex justify-center  font-Syne w-full font-semibold  sm:leading-[60px]  sm:text-[50px] text-3xl"
    >
      <h1>{title}</h1>
    </div>
  );
};

export default HeaderComponent;
