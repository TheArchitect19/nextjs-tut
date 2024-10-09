import React from "react";

export const Heading = ({ heading, contact }) => {
  return (
    <div
      className={`${
        contact && "text-right"
      } w-fit uppercase flex flex-col p-2 tracking-[3px] md:tracking-[6px] font-extralight text-[15px] md:text-[35px] `}
    >
      {heading}

      <div className="gap-1 md:gap-2 flex flex-col items-end mr-[3px] md:mr-[6px] relative md:top-[-5px]">
        <div className="h-[1px] bg-black w-[75%]"></div>
        <div className="h-[1px] bg-black w-[40%]"></div>
      </div>
    </div>
  );
};

export default Heading;
