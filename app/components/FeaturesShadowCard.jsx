import React from "react";

const FeaturesShadowCard = ({ id, className }) => {
  return (
    <div
      id={id}
      style={{
        border: "1px solid rgba(255, 255, 255, 0.20)",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        opacity: 0.5,
        background:
          "conic-gradient(from 181deg at 50% 50%, rgba(0, 0, 0, 0.00) 172.66420125961304deg, rgba(73, 53, 130, 0.42) 281.25deg, rgba(71, 47, 140, 0.17) 360deg), rgba(255, 255, 255, 0.05)",
      }}
      className={` w-[314px]   min-[1344px]:w-[334px]   relative opacity-50 rounded-3xl  ${className}`}
    />
  );
};

export default FeaturesShadowCard;
