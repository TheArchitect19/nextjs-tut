"use client";

import React, { useEffect, useState } from "react";
import "./Modal.css";
import { ModalCarousel } from "./ModalCarousel";
import { IoMdClose } from "react-icons/io";
import amazonIcon from "../assets/amazon.jpg";
import flipkartIcon from "../assets/flipkart.png";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWishList } from "../contexts/WishListContext";

export const Modal = ({ onClose, data }) => {
  const [dim, setDim] = useState(data.items[0].dim);
  const [dimension, setDimension] = useState(data.items[0].dimension);
  const [side, setSide] = useState(data.items[0].side);
  const [front, setFront] = useState(data.items[0].front);
  const [id, setId] = useState(data.items[0].id);
  const [amazon, setAmazon] = useState(data.items[0].amazon);
  const [flipkart, setFlipkart] = useState(data.items[0].flipkart);
  const [addFav, setAddFav] = useState(true);
  const [currObj, setCurrObj] = useState(data.items[0]);
  const [showMeasureMent, setShowMeasureMent] = useState(false);

  const selectedProduct = [];
  const { toggleWishList, favN, setFavN } = useWishList();
  const handleClick = (
    dim,
    dimension,
    side,
    front,
    id,
    amazon,
    flipkart,
    obj
  ) => {
    setDimension(dimension);
    setDim(dim);
    setSide(side);
    setFront(front);
    setId(id);
    setCurrObj(obj);
    if (amazon) setAmazon(amazon);
    if (flipkart) setFlipkart(flipkart);
  };
  selectedProduct.push(dim);
  selectedProduct.push(dimension);
  selectedProduct.push(side);
  selectedProduct.push(front);
  selectedProduct.push(amazon);
  selectedProduct.push(flipkart);

  // const notifyError = ({ data, setIsOpen }) => toast.error(data);
  const notifySuccess = () => {
    toast.success("Added to Wishlist!");
  };
  const notifyError = () => {
    toast.error("Removed from wishlist");
  };
  const handleSubmit = async (e) => {
    try {
      if (addFav === true) {
        // Add the product object to localStorage when adding to favorites
        const favoriteProducts =
          JSON.parse(localStorage.getItem("favoriteProducts")) || [];
        favoriteProducts.push(currObj);
        localStorage.setItem(
          "favoriteProducts",
          JSON.stringify(favoriteProducts)
        );
        notifySuccess();
        setAddFav(false);
        setFavN(favN + 1);
      } else {
        // Remove the product object from localStorage when removing from favorites
        const favoriteProducts =
          JSON.parse(localStorage.getItem("favoriteProducts")) || [];
        const updatedProducts = favoriteProducts.filter(
          (product) => product.id !== currObj.id
        );
        localStorage.setItem(
          "favoriteProducts",
          JSON.stringify(updatedProducts)
        );
        setAddFav(true);
        notifyError();
        setFavN(favN - 1);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  useEffect(() => {
    const favoriteProduct =
      JSON.parse(localStorage.getItem("favoriteProducts")) || [];
    if (favoriteProduct.some((favProd) => favProd.id === currObj.id)) {
      setAddFav(false);
    } else {
      setAddFav(true);
    }
  }, [currObj]);

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default context menu from appearing
  };

  const handleDragStart = (e) => {
    e.preventDefault(); // Prevent dragging
  };

  return (
    <>
      <ToastContainer />
      <div className="overlay" onClick={onClose} />
      <div className="modal">
        <div className="p-3 flex justify-end ">
          <button onClick={onClose} className="text-2xl font-bold">
            <IoMdClose />
          </button>
        </div>
        <div className="w-full px-4 flex flex-col items-end md:items-start md:flex-row gap-4">
          <div className="flex w-1/2 md:w-1/3 items-center ">
            <div className="flex w-full max-h-[52vh] overflow-y-auto md:flex-col gap-2 md:gap-4 pr-4 md:pr-0">
              {data.items?.map((obj, idx) => {
                return (
                  <div
                    className="flex p-1 items-end w-full md:gap-4 gap-2 md:items-center md:pl-4"
                    key={idx}
                  >
                    <button
                      onClick={() =>
                        handleClick(
                          obj.dim,
                          obj.dimension,
                          obj.side,
                          obj.front,
                          obj.id,
                          obj?.amazon,
                          obj.flipkart,
                          obj
                        )
                      }
                      className={`xl:w-12 xl:h-12 lg:w-10 lg:h-10 md:w-8 md:h-8 w-6 h-6 hover:scale-110 overflow-hidden rounded-full ${
                        id === obj.id && "md:border-2 md:p-1"
                      }  `}
                    >
                      <img
                        src={obj?.color.color_image}
                        className="object-cover h-full w-full  rounded-full"
                        alt="img"
                        onContextMenu={handleContextMenu}
                        onDragStart={handleDragStart}
                      />
                    </button>
                    <p className="hidden md:block xl:text-xl lg:text-lg text-md uppercase tracking-widest font-extralight">
                      {obj?.color?.color}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className=" order-first md:-order-first w-full md:w-2/3 flex justify-center items-center flex-col">
            <ModalCarousel
              data={selectedProduct}
              showMeasureMent={showMeasureMent}
            />
            <p className="hidden md:block text-sm sm:text-sm md:text-lg lg:text-xl ml-4 self-start tracking-widest font-extralight text-gray-600 uppercase">
              {data?.items[0]?.model?.category?.category} {">"}{" "}
              {data?.modelName}
            </p>
          </div>
        </div>
        <div className="w-full flex pb-4 md:mt-4 mt-0 gap-4 justify-center ">
          <div className="w-4/5 md:w-1/3 flex flex-col px-6 gap-1">
            <button
              className={`  flex justify-between items-center`}
              onMouseEnter={() => setShowMeasureMent(true)}
              onMouseLeave={() => setShowMeasureMent(false)}
            >
              <h1
                className={` ${
                  showMeasureMent ? "text-black" : " text-gray-400 "
                } tracking-widest text-[0.60rem] sm:text-sm md:text-md xl:text-lg md:font-extralight uppercase`}
              >
                Show Measurements
              </h1>
              <h1 className=" tracking-widest text-lg lg:text-xl xl:text-2xl font-extralight text-gray-400 uppercase">
                {"+"}
              </h1>
            </button>
            <button
              className="flex justify-between items-center"
              onClick={handleSubmit}
            >
              <h1 className=" tracking-widest text-[0.60rem] sm:text-sm md:text-md xl:text-lg md:font-extralight text-gray-400 uppercase">
                {addFav === true ? "Add to Favourites" : "Remove Favourite"}
              </h1>
              <h1 className=" tracking-widest text-lg lg:text-xl xl:text-2xl font-extralight text-gray-400 uppercase">
                {addFav === true ? "+" : "-"}
              </h1>
            </button>
          </div>
          <div className=" w-[22%] md:w-2/3 gap-2 md:gap-4 flex justify-evenly items-center mr-6">
            <h1 className=" hidden md:block tracking-widest md:text-md xl:text-lg font-extralight text-gray-400 uppercase">
              Want to feel like Maharaja ? See Pricing
            </h1>
            {amazon && (
              <div className="xl:w-12 p-1 md:p-2 xl:h-12 lg:w-10 lg:h-10 w-12 h-8 rounded-full overflow-hidden border-2 ">
                <Link
                  href={amazon === null ? "#" : amazon}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={amazonIcon}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </Link>
              </div>
            )}
            {flipkart && (
              <div className="xl:w-12 p-1 md:p-2 xl:h-12 lg:w-10 lg:h-10 w-12 h-8 rounded-full overflow-hidden border-2 ">
                <Link
                  href={flipkart === null ? "#" : flipkart}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={flipkartIcon}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
