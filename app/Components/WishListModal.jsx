"use client";

import React, { useState, useMemo, useEffect } from "react";
import "./Modal.css";
import { IoMdClose } from "react-icons/io";
import { useWishList } from "../contexts/WishListContext";
import { baseURL } from "../config";
import amazonIcon from "../assets/amazon.jpg";
import flipkartIcon from "../assets/flipkart.png";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export const WishListModal = () => {
  const { toggleWishList, favN, setFavN } = useWishList();
  const [fav, setFav] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response =
          JSON.parse(localStorage.getItem("favoriteProducts")) || [];
        setFav(response);
        setFavN(response.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <>
      <div
        className={`overlay`}
        style={{ borderRadius: "2px" }}
        onClick={() => toggleWishList()}
      />
      <div
        className="modal wishlist"
        style={{ borderRadius: "2px", paddingBottom: "1rem" }}
      >
        <div className="w-full lg:px-6 md:px-4 px-2 py-2 flex justify-end ">
          <button
            onClick={() => toggleWishList()}
            className="text-2xl font-bold"
          >
            <IoMdClose />
          </button>
        </div>
        <div className="w-full px-4 flex justify-center items-center gap-4">
          <div className="flex w-full flex-col gap-6 justify-center items-center">
            {fav.length !== 0 ? (
              fav.map((obj, id) => {
                return (
                  <div
                    key={id}
                    className="w-full border-b-1 border-black py-2 flex lg:px-3 md:px-1 gap-2 justify-between items-center"
                  >
                    <div className="flex gap-2 md:gap-3 lg:gap-4 items-end">
                      <div className="flex flex-col">
                        <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl tracking-widest font-extralight text-gray-600 uppercase">
                          {obj.model.category.category}
                        </h1>
                        <div className="flex gap-1 items-center">
                          <p className="text-[0.5rem] sm:text-sm md:text-lg lg:text-xl tracking-widest font-extralight text-gray-600 uppercase">
                            {obj.model.category.category} {">"}{" "}
                            {obj.model.model} {">"}
                          </p>
                          <div className=" lg:h-10 lg:w-10 md:w-8 md:h-8 w-3 h-3 overflow-hidden rounded-full bg-gray-200">
                            <img
                              src={obj.color.color_image}
                              alt="#"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-4 mr-4">
                      {obj.amazon && (
                        <div className="xl:w-12 p-[5px]  md:p-2 xl:h-12 lg:w-10 lg:h-10 w-7 h-7 md:w-10 md:h-10 rounded-full overflow-hidden border-2">
                          <Link
                            href={obj.amazon === null ? "#" : obj.amazon}
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
                      {obj.flipkart && (
                        <div className=" xl:w-12 p-[5px]  md:p-2 xl:h-12 lg:w-10 lg:h-10 w-7 h-7 md:w-10 md:h-10 rounded-full overflow-hidden border-2 ">
                          <Link
                            href={obj.flipkart === null ? "#" : obj.flipkart}
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
                );
              })
            ) : (
              <h2 className=" text-base pb-4 uppercase font-semibold md:text-lg lg:text-xl text-gray-700 text-center">
                No products found {": ("}
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
