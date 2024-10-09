"use client";

import React, { useState, useEffect } from "react";
import "./sidebar.css";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useSidebar } from "../contexts/index";
import { baseURL } from "../config";
import axios from "axios";

const SideBar = (props) => {
  const { toggleSidebar } = useSidebar();

  const fetchBrochure = async () => {
    try {
      const response = await axios.get(`${baseURL}broucher/`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "brochure.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Handle error
      console.error("Error fetching brochure:", error.message);
    }
  };

  const handleBrochureClick = async () => {
    console.log("c");
    await fetchBrochure();
    // toggleSidebar(); // Close the sidebar after clicking the brochure button
  };

  const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";

  return (
    <div className={`${sidebarClass} z-20 bg-gray-50`}>
      <div className="w-full flex justify-end p-2">
        <button onClick={toggleSidebar}>
          <CloseIcon fontSize="large" />
        </button>
      </div>
      <div className="mt-8 grid gap-6 justify-items-center items-center">
        <Link
          href="/"
          onClick={toggleSidebar}
          className="group text-black transition-all duration-300 ease-in-out"
        >
          <p className="p-4 pb-1 text-lg bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out ">
            Home
          </p>
        </Link>
        <Link
          href="/product"
          onClick={toggleSidebar}
          className="group text-black transition-all duration-300 ease-in-out"
        >
          <p className="p-4 pb-1 text-lg bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out ">
            Product
          </p>
        </Link>
        <Link
          href="/gallery"
          onClick={toggleSidebar}
          className="group text-black transition-all duration-300 ease-in-out"
        >
          <p className="p-4 pb-1 text-lg bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out ">
            Gallery
          </p>
        </Link>
        <Link
          href="/about"
          onClick={toggleSidebar}
          className="group text-black transition-all duration-300 ease-in-out"
        >
          <p className="p-4 pb-1 text-lg bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out ">
            About us
          </p>
        </Link>
        <Link
          href="/contact"
          onClick={toggleSidebar}
          className="group text-black transition-all duration-300 ease-in-out"
        >
          <p className="p-4 pb-1 text-lg bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out ">
            Contact Us
          </p>
        </Link>
        <button
          onClick={handleBrochureClick}
          className="group text-black transition-all duration-300 ease-in-out"
        >
          <p className="p-4 pb-1 text-lg bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out ">
            Brochure
          </p>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
