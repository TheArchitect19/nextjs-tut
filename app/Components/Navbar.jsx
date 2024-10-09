"use client";

import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { useSidebar } from "../contexts/index.js";
import { IoSearchOutline } from "react-icons/io5";
import { useWishList } from "../contexts/WishListContext";
import { WishListModal } from "./WishListModal";
import { baseURL } from "../config";
import axios from "axios";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
export default function Navbar() {
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const { wishListOpen, toggleWishList, favN, setFavN } = useWishList();
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const favItems =
        JSON.parse(localStorage.getItem("favoriteProducts")) || [];
      setFavN(favItems.length);
      if (query == "") return;
      try {
        const response = await axios.get(`${baseURL}search/?query=${query}`);
        setSearchResults(response.data?.models);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchData();
  }, [query]);

  const handleWishlist = () => {
    toggleWishList();
  };
  const [searchClicked, setSearchClicked] = useState();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".search-container") === null) {
        setSearchClicked(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className={`${
          sidebarOpen || wishListOpen ? "blur-lg" : ""
        } flex flex-wrap w-full place-items-top`}
      >
        <section className="relative w-full">
          <nav className="flex justify-between bg-white text-black w-full">
            <div className="px-2 xl:px-6 py-6 flex w-full items-center">
              <div className="flex gap-[10px] items-center">
                <button
                  onClick={() => {
                    toggleSidebar();
                  }}
                  className="font-light text-xl flex items-center"
                >
                  <MenuIcon className="text-3xl font-light" />
                </button>
                <span className=" mt-[2px] md:mt-[3px] text-md font-light uppercase tracking-wide">
                  Menu
                </span>
              </div>

              {/* Nav Links */}
              <ul className="hflex px-4 mx-auto font-semibold font-heading space-x-12"></ul>
              {/* Header Icons */}
              <div className="flex justify-evenly gap-4 px-4 items-center w-3/5 md:w-1/4 ">
                <div className="relative flex w-full gap-2 items-center justify-end font-light text-2xl search-container">
                  <IoSearchOutline
                    className="text-3xl font-light"
                    onClick={() => setSearchClicked(true)}
                  />
                  <div className=" items-center flex text-2xl mb-1">|</div>
                  <input
                    type="text"
                    placeholder="SEARCH"
                    className={`${
                      searchClicked ? "w-full md:w-4/5" : "w-0 md:w-1/2"
                    } transition-width ease-in-out tracking-wider font-light text-base outline-none text-gray-700`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onClick={() => setSearchClicked(true)}
                  />
                  <div
                    className={`${
                      searchClicked && query !== "" ? "block" : "hidden"
                    } w-full md:w-[63%] absolute bg-[#e8e8e8] p-3 rounded-b-md`}
                    style={{ top: "2rem" }}
                  >
                    <div className="w-full flex h-auto max-h-[25vh] overflow-y-auto tracking-wider font-light text-base">
                      <ul>
                        {searchResults?.length > 0
                          ? searchResults?.map((result, index) => {
                              return (
                                <Link
                                  key={index}
                                  className="w-full"
                                  href={`/product/#${result.category}`}
                                  passHref
                                  onClick={() => setSearchClicked(false)}
                                >
                                  <li className="py-1 w-full text-center cursor-pointer">
                                    {result.model}
                                  </li>
                                </Link>
                              );
                            })
                          : "No results found!"}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <FiHeart
                    fontWeight={"300"}
                    className="relative text-4xl  font-light cursor-pointer hover:scale-110"
                    onClick={handleWishlist}
                  />
                  {favN > 0 && (
                    <div className=" absolute -top-2 -right-2 flex justify-center items-center w-5 h-5 bg-red-500 text-white rounded-full">
                      <p className="flex items-center p-2">{favN}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </section>
      </div>
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => {
          toggleSidebar();
        }}
      />
      <div
        className={` w-full h-full  z-10  absolute top-0 left-0 ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => {
          toggleSidebar();
        }}
      ></div>
      {wishListOpen && <WishListModal />}
    </>
  );
}
