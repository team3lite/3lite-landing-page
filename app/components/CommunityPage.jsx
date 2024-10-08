"use client";
import React, { useRef, useEffect, useState, Fragment } from "react";

import Image from "next/image";
const InteractiveSemicircle = () => {
  return (
    <div className="relative   mt-10 mb-14  pb-5 w-[1150px] ">
      <SvgComponent />
      <div className="absolute top-[400px] left-0  w-full h-[202px] bg-[#070322] blur-[75px]" />
      <div className="absolute top-0 left-2 flex items-center justify-center h-full w-full z-0">
        <div className="flex sm:gap-10 gap-4 flex-col items-center justify-center">
          <div className="sm:text-[30px] lg:text-[40px] min-[480px]:text-[30px] min-[480px]:leading-[36px]  sm:leading-[46px] mt-10 sm:mt-0 leading-5 text-[16px] break-before-auto sm:w-[340px]  lg:w-[440px] w-[200px] min-[480px]:w-[310px] font-medium text-center font-Syne">
            Messaging just got sui&#8209;ft and secure with the Sui Blockchain.
          </div>
          <div className=" bg-gradient-to-b hover:bg-gradient-to-t hover:pb-[1px] active:p-[0.4px] rounded-full from-[#77679F] to-[rgba(119,103,159,0)] pt-[1px] px-[1px]">
            <div className=" rounded-full   bg-[#070322] ">
              <button
                style={{
                  background:
                    "conic-gradient(from 270deg at 50% 50%, #140F2A 0deg, rgba(100, 67, 194, 0.25) 58.25deg, rgba(71, 47, 140, 0.10) 290deg)",
                }}
                className="font-syne sm:p-[16px_60px]  p-[10px_35px]  rounded-full text-white font-normal sm:text-lg text-base   "
              >
                Join us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveSemicircle;

const SvgComponent = () => {
  const svgRef = useRef(null);
  const [elementPositions, setElementPositions] = useState([]);
  const [roundElementPositions, setRoundElementPositions] = useState([]);

  useEffect(() => {
    const getPointAtOffset = (pathId, offset) => {
      const svgElement = svgRef.current;
      const path = svgElement?.querySelector(pathId);
      const point = path?.getPointAtLength(path.getTotalLength() * offset);
      return { x: point.x, y: point.y };
    };

    const calculatePositions = () => {
      const positions = [
        {
          pathId: "#smallPath",
          offset: 0.75,
          text: "That was amazing! Greatjob!",
          user: "Ugwu Chidi",
          image: "/potraits/chidi.jpg",
        },
        {
          pathId: "#mediumPath",
          offset: 0.55,
          text: "Highly Recommended!",
          user: "Josh Sparks",
          image: "/potraits/josh.jpg",
        },
        {
          pathId: "#largePath",
          offset: 0.2,
          text: "The results are outstanding!",
          user: "Mike James",
          image: "/potraits/tim.jpg",
        },
        {
          pathId: "#largePath",
          offset: 0.3,
          text: "Nice work, love it!🔥",
          user: "Ugbor Charles",
          image: "/potraits/your.jpg",
        },
      ].map((item) => ({
        ...item,
        ...getPointAtOffset(item.pathId, item.offset),
      }));
      const roundRositions = [
        {
          pathId: "#mediumPath",
          offset: 0.13,
          text: "Medium 2",
          image: "/potraits/henry.jpg",
        },
        {
          pathId: "#largePath",
          offset: 0.4,
          text: "Large 1",
          image: "/potraits/your.jpg",
        },
        {
          pathId: "#smallPath",
          offset: 0.65,
          text: "Small 2",
          image: "/potraits/divine.jpg",
        },
        {
          pathId: "#smallPath",
          offset: 0.87,
          text: "Small 2",
          image: "/potraits/divine.jpg",
        },
      ].map((item) => ({
        ...item,
        ...getPointAtOffset(item.pathId, item.offset),
      }));

      setElementPositions(positions);
      setRoundElementPositions(roundRositions);
    };

    calculatePositions();
  }, []);
  return (
    <>
      <svg
        ref={svgRef}
        viewBox="0 0 1400 955"
        className="w-full scale-[3.5] min-[400px]:scale-[2.5] min-[500px]:scale-[2] sm:scale-[1.4] md:scale-[1.2] lg:scale-100 overflow-visible"
      >
        <defs>
          <style type="text/css">
            {`
            .centered-text { font-family: 'Roboto', sans-serif; font-weight: 700; }
              .button-text { font-family: 'Roboto', sans-serif; font-weight: 400; }
              .path-text { font-family: 'Roboto', sans-serif; font-weight: 400; }
            `}
          </style>
          <linearGradient id="gradientStroke" x1="30%" y1="80%" x2="0%" y2="0%">
            <stop
              offset="0%"
              style={{
                stopColor: "#B929FF",

                stopOpacity: 0.1,
              }}
            />{" "}
            <stop
              offset="5%"
              style={{ stopColor: "#B929FF", stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#B929FF", stopOpacity: 0.8 }}
            />
            <stop
              offset="80%"
              style={{ stopColor: "#B929FF", stopOpacity: 0.7 }}
            />{" "}
            <stop
              offset="100%"
              style={{ stopColor: "#B929FF", stopOpacity: 0.2 }}
            />
          </linearGradient>

          <filter
            id="shadowFilter"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="-5"
              dy="-5"
              stdDeviation="11"
              floodColor="white"
            />
          </filter>

          <path
            filter="url(#shadowFilter)"
            stroke="url(#gradientStroke)"
            strokeWidth="3"
            fill="none"
            id="largePath"
            d="M150,1000 A675,675 0 1,1 1250,1000"
          />

          <path
            stroke="url(#gradientStroke)"
            d="M275,1000 A575,575 0 1,1 1125,1000"
            strokeOpacity={0.6}
            id="mediumPath"
          />
          <path
            stroke="url(#gradientStroke)"
            id="smallPath"
            strokeOpacity={0.4}
            d="M375,1000 A500,500 0 1,1 1025,1000"
          />

          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" style={{ stopColor: "rgba(119, 103, 159, 1)" }} />
            <stop offset="100%" style={{ stopColor: "rgba(83, 64, 129, 1)" }} />
          </linearGradient>
        </defs>

        <use href="#largePath" fill="none" stroke="black" strokeWidth="2" />
        <use href="#mediumPath" fill="none" stroke="black" strokeWidth="2" />
        <use href="#smallPath" fill="none" stroke="black" strokeWidth="2" />

        {elementPositions.map((pos, index) => (
          <Fragment key={index}>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" style={{ stopColor: "#ffffff" }} />
                <stop offset="100%" style={{ stopColor: "#ffffff" }} />
              </linearGradient>
              <clipPath id="circle-clip">
                <circle
                  cx="42"
                  cy="39"
                  r="25.5"
                  strokeWidth="0"
                  stroke="#524080"
                />
              </clipPath>
            </defs>
            <rect
              x="0"
              y="0"
              rx="40"
              ry="70"
              width="300"
              transform={`translate(${pos.x}, ${pos.y})`}
              height="79"
              fill="url(#gradient)"
              stroke="#524080"
              strokeWidth="1"
            />
            <circle
              transform={`translate(${pos.x}, ${pos.y})`}
              cx="42"
              cy="39"
              r="25.5"
              strokeOpacity={0.2}
              strokeWidth="1.6"
              stroke="#070322"
            />
            <image
              x="12"
              y="9"
              width="62"
              transform={`translate(${pos.x}, ${pos.y})`}
              height="62"
              href={pos.image}
              clipPath="url(#circle-clip)"
            />

            <g transform={`translate(${pos.x}, ${pos.y})`} key={index}>
              <text
                y="30"
                x="80"
                fontFamily="SUSE"
                fontSize="16"
                fontWeight="bold"
                fill="white"
                textAnchor="start"
                dominantBaseline="middle"
              >
                {pos.text}
              </text>

              <text
                y="55"
                x="80"
                fontFamily="Suse"
                fontSize="14"
                fill="white"
                opacity="0.7"
              >
                {pos.user}
              </text>
            </g>
          </Fragment>
        ))}
        {roundElementPositions.map((pos, index) => (
          <Fragment key={index}>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" style={{ stopColor: "#ffffff" }} />
                <stop offset="100%" style={{ stopColor: "#ffffff" }} />
              </linearGradient>
              <clipPath
                stroke="#fff"
                strokeWidth="1"
                fill="#fff"
                id="circle-clip2"
              >
                <circle
                  cx="0"
                  cy="-50"
                  r="25.5"
                  strokeWidth="2"
                  stroke="#fff"
                />
              </clipPath>
            </defs>
            <circle
              cx="0"
              transform={`translate(${pos.x}, ${pos.y})`}
              cy="-50"
              r="26"
              strokeWidth="1.6"
              stroke="#aaa"
            />
            <image
              x="-26"
              y="-75"
              width="55"
              transform={`translate(${pos.x}, ${pos.y})`}
              height="55"
              stroke="#fff"
              strokeWidth="2"
              href={pos.image}
              clipPath="url(#circle-clip2)"
            />
            <circle
              cx="0"
              cy="-15"
              transform={`translate(${pos.x}, ${pos.y})`}
              r="5.5"
              fill="#c4c4c4"
              stroke="#524080"
              strokeWidth="0"
            />
          </Fragment>
        ))}
      </svg>
    </>
  );
};
