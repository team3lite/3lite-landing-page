const FeaturesCard = ({ features, className, id }) => {
  const { blob, description, href, title } = features;

  return (
    <div
      id={id}
      style={{
        border: "1px solid rgba(255, 255, 255, 0.20)",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        background:
          "conic-gradient(from 181deg at 50% 50%, rgba(0, 0, 0, 0.00) 172.66420125961304deg, rgba(73, 53, 130, 0.30) 281.25deg, rgba(71, 47, 140, 0.12) 360deg), #393054",
      }}
      className={`Frame47401 px-8  overflow-hidden  flex flex-col justify-between min-[1344px]:w-[334px]   w-[310px] h-96 relative  rounded-3xl shadow border border-opacity-20 border-white/20 ${className} `}
    >
      <div className="text flex flex-col ">
        <div className=" font-suse select-txt w-64 min-h-[50px] pb-3  text-white text-3xl font-medium font-['Tomato Grotesk']">
          {title}
        </div>
        <div className=" font-Poppins font-extralight select-tet w-48  text-white text-base text-[14px]">
          {description}
        </div>
      </div>

      <svg
        className={`size-[300px] absolute ${blob.className}`}
        viewBox={blob.viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="size-[300px]"
          style={{
            fill: blob.pathFill,
            stroke: blob.pathStroke,
            strokeWidth: blob.pathStrokeWidth,
          }}
          d={blob.pathD}
          transform={blob.transform}
        />
      </svg>
      <button
        style={{
          background:
            "conic-gradient(from 181deg at 50% 50%, rgba(0, 0, 0, 0.00) 172.66420125961304deg, rgba(73, 53, 130, 0.30) 281.25deg, rgba(71, 47, 140, 0.12) 360deg), rgba(16, 16, 16, 0.20)",
        }}
        className="Frame47400 px-4 py-2 left-[29px] top-[315px] absolute  rounded-full border border-white justify-start items-center gap-6 inline-flex"
      >
        <span
          role=""
          className="LearnMore text-white text-base font-medium font-['Satoshi']"
        >
          Learn more
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="9"
          viewBox="0 0 41 9"
          fill="none"
        >
          <path
            d="M40.3536 4.79911C40.5488 4.60385 40.5488 4.28727 40.3536 4.092L37.1716 0.910023C36.9763 0.714761 36.6598 0.714761 36.4645 0.910023C36.2692 1.10528 36.2692 1.42187 36.4645 1.61713L39.2929 4.44556L36.4645 7.27398C36.2692 7.46925 36.2692 7.78583 36.4645 7.98109C36.6598 8.17635 36.9763 8.17635 37.1716 7.98109L40.3536 4.79911ZM3.05176e-05 4.94556H40V3.94556H3.05176e-05V4.94556Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default FeaturesCard;
