"use client";



import "./ModalCarousel.css";
import { useState } from "react";
import Slider from "react-slick";
// import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const PrevArrow = ({ onClick, isLeftActive, showMeasureMent}) => {
  return (
    <div className={`modalArrow modalprev ${isLeftActive && !showMeasureMent ? "animate-bounce": ""}`} onClick={onClick} >
      <FaArrowLeft />
    </div>
  );
};

const NextArrow = ({ onClick, isRightActive, showMeasureMent}) => {
  return (
    <div className={`modalArrow modalnext ${isRightActive && !showMeasureMent ? "animate-bounce": ""}`} onClick={onClick}>
      <FaArrowRight />
    </div>
  );
};

export const ModalCarousel = ({data, showMeasureMent})=> {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    e.preventDefault();
  };
  
  const [imageIndex, setImageIndex] = useState(0);
  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(true); 

  const settings = {
    infinite: false,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow isRightActive={isRightActive} showMeasureMent={showMeasureMent} />,
    prevArrow: <PrevArrow isLeftActive={isLeftActive} showMeasureMent={showMeasureMent} />,
    beforeChange: (current, next) => {
      setImageIndex(next);
      setIsLeftActive(next !== 0);
      setIsRightActive(next !== 2);
    }

  };

  return (
    <div className="Carousel">
      {
        !showMeasureMent ? 
        <Slider {...settings}>
            <div>
                <img
                  style={{maxHeight: "50vh"}}
                  src={data[0]}
                  alt={"random image"}
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                />
            </div>
            <div>
                <img
                  style={{maxHeight: "50vh"}}
                  src={data[2]}
                  alt={"random image"}
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                />
            </div>
            <div>
                <img
                  style={{maxHeight: "50vh"}}
                  src={data[3]}
                  alt={"random image"}
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                />
            </div>
        </Slider>
          :
        <Slider {...settings} >
          <div>
            <img
              style={{maxHeight: "50vh"}}
              src={data[1]}
              alt={"random image"}
              onContextMenu={handleContextMenu}
              onDragStart={handleDragStart}
            />
          </div>
        </Slider>
        }
    </div>
  );
}
