"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import "../globals.css";
const WishListContext = createContext();

const WishListProvider = ({ children }) => {
  const [wishListOpen, setWishListOpen] = useState(false);
  const [favN, setFavN] = useState(0);
  const toggleWishList = () => {
    setWishListOpen((prevWishListOpen) => !prevWishListOpen);
  };

  useEffect(() => {
    if (wishListOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [wishListOpen]);

  useEffect(() => {
    const handlePageChange = () => {
      setWishListOpen(false);
    };

    const handleHashChange = () => {
      setWishListOpen(false);
    };

    window.addEventListener("popstate", handlePageChange);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("popstate", handlePageChange);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <WishListContext.Provider
      value={{ wishListOpen, toggleWishList, favN, setFavN }}
    >
      {children}
    </WishListContext.Provider>
  );
};

const useWishList = () => {
  const context = useContext(WishListContext);
  return context;
};

export { WishListProvider, useWishList };
