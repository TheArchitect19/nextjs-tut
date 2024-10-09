import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";


const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRightLong />
      </div>
    );
  };

export default NextArrow;