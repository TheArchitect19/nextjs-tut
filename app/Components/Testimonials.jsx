"use client";

import React, { useState, useEffect } from "react";
import { baseURL } from "../config";
import { WiStars } from "react-icons/wi";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { MdOutlineStarPurple500 } from "react-icons/md";
import axios from "axios";
import "swiper/css";
import "swiper/css/effect-coverflow";
import Heading from "./Heading";
import Image from "next/image";

export const Testimonials = (data) => {
  const testimonial = data.data;
  // useEffect(() => {
  //     const fetchdata = async () => {
  //         try {
  //             const res = await axios.get(`${baseURL}testimonial/`);
  //             setTestimonial(res.data);
  //         } catch (error) {
  //             console.error('Error fetching data:', error);
  //         }
  //     };

  //     fetchdata();
  // }, []);
  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default context menu from appearing
  };

  const handleDragStart = (e) => {
    e.preventDefault(); // Prevent dragging
  };

  return (
    <div className="w-full relative bg-gray-50 p-4 mt-6 flex justify-center md:mt-12 md:p-8">
      <WiStars className="absolute hidden md:block text-[10rem]  right-5 text-gray-300" />
      <div className="w-full p-4 flex flex-col md:w-10/12 md:p-0">
        <Heading heading="Voices of Admiration" />

        <div className="w-full min-h-[50vh] relative flex justify-center items-center flex-col">
          <div className="mt-5 flex justify-between w-[90%] md:w-4/5 lg:w-[70%] ">
            <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wider">
              <FaQuoteLeft />
            </div>
            <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wider">
              <FaQuoteRight />
            </div>
          </div>
          <div className="w-full min-h-[30vh] lg:min-h-[40vh] flex justify-center items-center md:items-start">
            <Swiper
              loop={true}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper bg-transparent"
            >
              {testimonial?.map((testimonial, id) => (
                <SwiperSlide key={id}>
                  <div
                    key={id}
                    className="py-5 relative rounded-xl dark:bg-dark2 w-full bg-white border-2 shadow-md flex flex-col justify-center items-center"
                  >
                    <div className="rounded-full absolute -top-10 border-2 border-black bg-gray-300 flex justify-center items-center w-[5.5rem] h-[5.5rem]">
                      <div className="rounded-full w-20 h-20 border-2 overflow-hidden">
                        <Image
                          width={100}
                          height={100}
                          src={testimonial?.image}
                          alt="dp"
                          className="object-cover w-full h-full"
                          onContextMenu={handleContextMenu}
                          onDragStart={handleDragStart}
                        />
                      </div>
                    </div>
                    <div className="p-4 pb-1 md:pb-4 text-center">
                      <p className="text-[0.75rem] md:text-medium md:px-4 md:tracking-wider mt-6 text-center md:leading-4">
                        {testimonial.testimonial}
                      </p>
                    </div>
                    <div className="w-1/3 align center flex justify-center gap-1 md:gap-2">
                      <MdOutlineStarPurple500 className="text-yellow-500 text-4xl md:text-2xl" />
                      <MdOutlineStarPurple500 className="text-yellow-500 text-4xl md:text-2xl" />
                      <MdOutlineStarPurple500 className="text-yellow-500 text-4xl md:text-2xl" />
                      <MdOutlineStarPurple500 className="text-yellow-500 text-4xl md:text-2xl" />
                      <MdOutlineStarPurple500 className="text-yellow-500 text-4xl md:text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-[0.85rem] mt-2 md:mt-4 font-semibold md:text-lg">
                        {testimonial.name}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <WiStars className="absolute hidden md:block text-[10rem]  left-5 bottom-0 text-gray-300" />
      </div>
    </div>
  );
};

// export default Testimonials
