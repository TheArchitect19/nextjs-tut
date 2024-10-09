/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { LogoBar } from "../Components/LogoBar";
import { useWishList } from "../contexts/WishListContext";
import { useSidebar } from "../contexts/index.js";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./swiperStyle.css";
import { Testimonials } from "../Components/Testimonials";
import { Heading } from "../Components/Heading";
import Image from "next/image";
import { Contact } from "../Components/Contact.jsx";

export const HomePage = (data) => {
  const { sidebarOpen } = useSidebar();
  const { wishListOpen } = useWishList();
  const assets = data?.data.data;
  const category = data?.data.data.category;
  const testimonial = data.data.testimonial;

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`${
        sidebarOpen || wishListOpen ? " blur-lg" : "block"
      } bg-white px-4 py-2 pb-8  md:px-6`}
    >
      <LogoBar />
      <div className="mt-6 md:mt-8 min-h-[20vh] md:min-h-[40vh] lg:min-h-[60vh] w-full h-full">
        <img
          src={assets?.produts?.banner}
          className="object-cover w-full h-full"
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
        />
      </div>

      {/*WHO ARE WE  */}
      <div className="w-full mt-4 md:mt-8 flex justify-center">
        <div className=" w-full p-2 md:p-0 md:w-10/12 flex flex-col ">
          <Link href="/about">
            <Heading heading="Who are we" />
          </Link>

          <div className="mt-2 w-[85%] m-auto h-[15vh] md:h-full md:w-full md:mt-4">
            <img
              src={assets?.produts?.who_are_we_image}
              className="object-cover w-full h-full"
              alt="whoAreWe"
              onContextMenu={handleContextMenu}
              onDragStart={handleDragStart}
            />
          </div>

          <div className="my-4 px-2 md:my-8 md:px-12">
            <p className=" text-[12px] md:text-[16px] leading-5  md:leading-6  text-center text-pColor tracking-wide md:text-justify md:tracking-widest ">
              {assets?.produts?.who_are_we}
            </p>
          </div>
        </div>
      </div>

      {/* Discover Comfort */}
      <div className="w-full bg-e3e3e3 p-4 mt-6 flex justify-center md:mt-12 md:p-8">
        <div className=" w-full p-4 flex flex-col md:w-10/12 md:p-0">
          <Heading heading="Discover Comfort" />

          <div className=" my-4 px-0 sm:px-4 md:my-8 md:px-12">
            <p className="text-[12px] md:text-[16px] leading-5  md:leading-6   text-center text-pColor tracking-wider">
              {assets?.produts?.discover_comfort}
            </p>
          </div>

          <div className="flex  gap-4 w-full mt-4 justify-center items-center">
            <div className=" grid grid-cols-2 md:grid-cols-4 items-end justify-between flex-wrap gap-4 md:gap-3 md:w-4/5 md:justify-center">
              {category?.map((obj, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex justify-end items-center flex-col h-auto"
                  >
                    <Link
                      href={`/product/#${obj.category}`}
                      className="transition duration-150 ease-out hover:ease-in hover:cursor-pointer hover:scale-125 h-[60%] w-[60%] md:h-[60%] md:w-[50%]"
                    >
                      <img
                        src={obj?.image}
                        alt="heavyDuty"
                        onContextMenu={handleContextMenu}
                        onDragStart={handleDragStart}
                      />
                    </Link>
                    <p className="text-center w-full font-normal uppercase tracking-wider text-[10px] md:text-[14px]">
                      {obj.category}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full flex justify-center items-center mt-[1.5rem] md:mt-[4rem] md:mb-[2rem]">
            <Link
              href="/product"
              style={{ boxShadow: "0px 4px 8px 1px #48484854" }}
              className="uppercase tracking-wider  bg-gray-50 px-[1.5rem] md:px-[7rem]  py-[0.7rem]   rounded-md md:rounded-2xl text-[12px] md:text-[16px]"
            >
              <button className="mt-[1px]">View Products</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Voice of admiration */}
      <Testimonials data={testimonial} />
      <Contact />
    </div>
  );
};
// boxShadow: "0px 4px 10px #48484867",
