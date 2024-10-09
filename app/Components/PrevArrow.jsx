import React from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";

const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeftLong />
      </div>
    );
  };

export default PrevArrow;