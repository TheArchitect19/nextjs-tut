"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { LogoBar } from "../Components/LogoBar.jsx";
import { Contact } from "../Components/Contact.jsx";
import banner from "../assets/banner3.png";
import { GalleryCarousel } from "../Components/GalleryCarousel.jsx";
import { useSidebar } from "../contexts/index.js";
import { baseURL } from "../config.ts";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { useWishList } from "../contexts/WishListContext.js";
import Heading from "../Components/Heading.jsx";
import Link from "next/link.js";


export default function GalleryPage(galleryData) {
  const { sidebarOpen } = useSidebar();

  const assets = galleryData.galleryData;
  const [subSelectedImage, selectSubSelectedImage] = useState(
    assets[0].models[0]
  );
  const [selectedImage, setSelectedImage] = useState(assets[0]);
  const [selectedCategory, setSelectedCategory] = useState(assets[0].category);
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const { wishListOpen } = useWishList();

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
      <p className="text-[0.70rem] lg:text-lg text-black uppercase tracking-widest mt-2">
        <Link href="/">Home</Link> {">"} lifestyles{" "}
      </p>
      <div className="mt-6 md:mt-8 w-full h-full">
        <Image
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
          src={banner}
          className="object-cover w-full h-full"
          alt="banner"
        />
      </div>

      <div className="w-full mt-4 md:mt-8 flex justify-start">
        <div className=" w-full md:w-10/12 ml-0 md:md-8 lg:ml-12 flex flex-col ">
          <Heading heading="Showing the class" />
          <div className="my-6 md:my-8 px-6 md:px-10 lg:px-12 text-xl text-gray-100 font-light">
            <p className=" text-justify text-pColor tracking-wider text-[12px] md:text-[16px] leading-5  md:leading-6">
              Step into a world of comfort and style with our captivating
              gallery showcasing lifestyle Images of chairs. Immerse yourself in
              the artistry of seating as each photograph tells a unique story of
              form, function, and fashion. From sleek modern designs to timeless
              classics, our curated collection captures the essence of comfort
              and elegance. Explore the perfect blend of aesthetics and
              functionality, inspiring you to elevate your living spaces.{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 md:mt-[5rem]">
        <div className=" hidden md:flex justify-between items-center pr-[6vw] pl-[3rem]">
          <div className="hidden md:flex items-center h-auto  gap-6 md:gap-8 lg:gap-10 ">
            <div className=" border-2 border-gray-500 w-20 h-20 md:h-26 md:w-26 lg:w-32 lg:h-32 flex justify-center items-center">
              <div className="bg-gray-200 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"></div>
            </div>
            <p className="font-bold tracking-wider text-xl md:text-2xl lg:text-3xl xl:text-4xl uppercase ">
              Products
            </p>
          </div>
          <div className="flex items-center gap-3 ">
            <span className="text-2xl text-end tracking-wide flex items-end gap-2">
              Being At
            </span>
            <p className="text-3xl uppercase font-semibold">Home</p>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between h-auto items-start">
          <div className="flex flex-col md:hidden h-auto w-full gap-2 p-2">
            <div className="flex gap-6 md:gap-8 lg:gap-10  p-2 md:p-4 lg:p-6 items-center">
              <div className=" border-2 border-gray-500 w-[4rem] h-[4rem]  flex justify-center items-center">
                <div className="bg-e3e3e3 w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24"></div>
              </div>
              <p className="font-bold tracking-wider text-xl md:text-2xl lg:text-3xl xl:text-4xl uppercase ">
                Products
              </p>
            </div>
            <div className=" block md:hidden w-full h-auto ">
              <div className="flex justify-end items-center gap-5 pr-3 pt-3 mb-[2rem]">
                <span className="text-xl text-end tracking-wide flex items-end gap-2">
                  Being At
                </span>
                <p className="text-2xl uppercase font-semibold">Home</p>
              </div>
              <GalleryCarousel
                selectedImage={subSelectedImage}
                category={selectedCategory}
              />
            </div>
          </div>
          <div className=" w-full  md:w-2/5 md:min-h-[50vh]">
            <div className="w-full mt-4 flex justify-center">
              <div className="flex flex-col w-full items-center">
                {
                  <>
                    {/* Spacer */}
                    <div
                      className={`h-[7.2rem] hidden ${
                        dialogueOpen ? "md:hidden" : "md:block"
                      }`}
                    ></div>

                    {/* Dialogue box */}
                    <div
                      className={`hidden ${
                        dialogueOpen ? "md:flex" : "md:hidden"
                      } h-[7.2rem] min-w-12 max-w-full flex-col bg-gray-200 justify-start p-2 rounded-md relative`}
                    >
                      {/* Images */}
                      <div
                        className=" flex mr-2 justify-end cursor-pointer"
                        onClick={() => setDialogueOpen(false)}
                      >
                        {" "}
                        <IoMdClose />
                      </div>
                      <div
                        className={`flex ${
                          selectedImage?.models?.length < 5 && "justify-center"
                        } w-full h-36 overflow-auto`}
                      >
                        {selectedImage?.models?.length !== 0 ? (
                          selectedImage?.models?.map((model, id) => (
                            <div
                              key={id}
                              className="min-w-20 flex flex-col items-center justify-center"
                            >
                              <img
                                src={model.model_image_no_background}
                                alt="random"
                                onClick={() => selectSubSelectedImage(model)}
                                onContextMenu={handleContextMenu}
                                onDragStart={handleDragStart}
                                className="h-4/5 cursor-pointer hover:scale-110 transform transition-transform ease-in"
                              />
                              <h3 className="text-[0.65rem] uppercase tracking-wider">
                                {model.model}
                              </h3>
                            </div>
                          ))
                        ) : (
                          <div
                            className="flex justify-center items-center text-xl font-semibold text-gray-700"
                            style={{ padding: "1rem 2rem" }}
                          >
                            Nothing here to show {": ("}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                }
                <div className="relative grid justify-center items-center grid-cols-4 gap-4 mt-4">
                  {assets.map((obj, id) => (
                    <div
                      key={id}
                      className="flex flex-col justify-center items-center"
                    >
                      <img
                        src={obj.image}
                        onContextMenu={handleContextMenu}
                        onDragStart={handleDragStart}
                        alt="random"
                        className="w-[75%] h-auto cursor-pointer hover:scale-110"
                        onClick={() => {
                          setDialogueOpen(true);
                          setSelectedImage(obj);
                          setSelectedCategory(obj.category);
                        }}
                      />
                      <p className="text-[0.65rem] md:tracking-wider md:text-sm uppercase text-center mt-2">
                        {obj.category}
                      </p>
                    </div>
                  ))}
                  <div
                    className={`${
                      dialogueOpen ? "flex" : "hidden"
                    } md:hidden absolute w-full  gap-0 bg-e3e3e3 flex-col py-2 rounded-md h-28 `}
                  >
                    <div
                      className=" flex mr-2 justify-end cursor-pointer"
                      onClick={() => setDialogueOpen(false)}
                    >
                      {" "}
                      <IoMdClose />
                    </div>
                    <div
                      className={`flex ${
                        selectedImage?.models?.length < 3 && "justify-center"
                      } w-full h-40 overflow-auto`}
                    >
                      {selectedImage?.models?.length !== 0 ? (
                        selectedImage?.models?.map((model, id) => (
                          <div
                            key={id}
                            className=" min-w-28 flex flex-col items-center justify-center"
                          >
                            <img
                              src={model.model_image_no_background}
                              alt="random"
                              onClick={() => selectSubSelectedImage(model)}
                              onContextMenu={handleContextMenu}
                              onDragStart={handleDragStart}
                              className="h-3/5 cursor-pointer hover:scale-110 transform transition-transform ease-in"
                            />
                            <h3 className="mt-2 text-[0.65rem] text-center uppercase tracking-wider">
                              {model.model}
                            </h3>
                          </div>
                        ))
                      ) : (
                        <div className="flex justify-center items-center font-bold text-l">
                          Nothing here to show {": ("}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" hidden md:block w-1/2 h-auto ">
            <GalleryCarousel
              selectedImage={subSelectedImage}
              category={selectedCategory}
            />
          </div>
        </div>
      </div>

      <Contact />
    </div>
  );
}
