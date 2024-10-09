"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../config";
import MapComponent from "./MapComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@nextui-org/react";
import Heading from "./Heading";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [query, setQuery] = useState("");
  const [value, setValue] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const resetFormFields = () => {
    setName("");
    setEmail("");
    setMobile("");
    setCity("");
    setState("");
    setQuery("");
  };
  const notifyError = (data) => toast.error(data);
  const notifySuccess = () => {
    toast.success("Sent!");
    resetFormFields(); // Reset form fields after successful submission
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowProgressBar(true);
    const formData = {
      name: name,
      email: email,
      number: mobile, // Assuming 'number' corresponds to 'mobile' in your backend
      state: state,
      city: city,
      query: query,
    };

    const flag = name && email && mobile && state && city && query;
    if (flag.length === 0) {
      setShowProgressBar(false);
      return notifyError("Some fields are empty");
    }

    if (mobile.length != 10) {
      setShowProgressBar(false);
      return notifyError("Mobile number is not correct !");
    }

    try {
      const response = await axios.post(`${baseURL}contact/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response.data);
      setShowProgressBar(false);
      notifySuccess();

      // Handle success
      console.log("Form submitted successfully");
    } catch (error) {
      // Handle error
      console.error("Error submitting form:", error.message);
      setShowProgressBar(false);
      notifyError("error occurred");
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default context menu from appearing
  };

  const handleDragStart = (e) => {
    e.preventDefault(); // Prevent dragging
  };

  return (
    <div className="w-full p-2 mt-4 md:mt-8 flex justify-center bg-[#E3E3E3] items-center h-auto md:p-4 lg:p-8">
      <ToastContainer />
      <div className="w-full bg-white h-[90%] p-4">
        <Heading contact={true} heading="Want Bulk Orders? Let's Connect" />

        <div className="flex justify-center p-2 md:p-4 lg:p-6 gap-4 items-center">
          <div className=" hidden md:flex  flex-col justify-evenly min-h-[65vh] gap-5 w-1/4 ">
            <div className="w-full flex flex-col justify-center items-center gap-3">
              {/*  */}
              <MapComponent />
              <p className="text-center tracking-wider text-[12px] md:text-[16px] leading-5  ">
                A-7/48-52, South Side of G.T.Road, Industrial Area, Ghaziabad{" "}
                <br />
                Uttar Pradesh 201009
              </p>
            </div>
          </div>
          <div className="hidden md:block pt-6 border-2 rounded-sm bg-black w-1 min-h-[65vh]" />
          <div className="flex flex-col w-full md:w-2/3 gap-4 sm:gap-6 md:gap-10">
            <p className="text-[12px] md:text-[16px] leading-5    tracking-wider text-left">
              Elevate Your Space with Bulk Brilliance! Explore unbeatable deals
              on our premium chairs, tables, stools, and more. Transform any
              setting with style and quality. For exclusive bulk purchases that
              redefine your space, reach out to us today. Let&apos;s create a
              tailored solution for your needs. Elevate your environment contact
              us now to unlock extraordinary deals and redefine your space with
              sophistication!
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-4 gap-1 md:gap-3 lg:gap-4 mt-2">
                <input
                  className="col-span-4 border-2 text-sm md:text-md p-1 sm:p-2 md:p-3 rounded-lg"
                  placeholder="Full Name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="col-span-2 border-2 text-sm md:text-md p-1 sm:p-2 md:p-3 rounded-lg"
                  placeholder="Email ID"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="col-span-2 border-2 text-sm md:text-md p-1 sm:p-2 md:p-3 rounded-lg"
                  placeholder="Mobile Number"
                  type="text"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <input
                  className="col-span-2 border-2 text-sm md:text-md p-1 sm:p-2 md:p-3 rounded-lg"
                  placeholder="City"
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  className="col-span-2 border-2 text-sm md:text-md p-1 sm:p-2 md:p-3 rounded-lg"
                  placeholder="State"
                  type="text"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <textarea
                  id="query"
                  cols="30"
                  rows="4"
                  className="col-span-4 border-2 p-3 rounded-lg"
                  placeholder="Type your query here"
                  name="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-center items-center mt-4">
                <button className="text-lg tracking-wider rounded-md bg-white border-2 p-12 cursor-pointer py-1 md:py-2  hover:bg-black hover:text-white">
                  Submit
                </button>
                {showProgressBar && (
                  <CircularProgress
                    aria-label="Loading..."
                    size="lg"
                    value={value}
                    color="warning"
                    showValueLabel={true}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
