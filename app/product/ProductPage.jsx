"use client";

import React, { useState, useMemo } from "react";
import axios from "axios";
import { LogoBar } from "../Components/LogoBar.jsx";
import { Modal } from "../Components/Modal.jsx";
import { Contact } from "../Components/Contact.jsx";
// import { baseURL } from "../config.js";
import { useSidebar } from "../contexts/index.js";
import { useWishList } from "../contexts/WishListContext.js";
import Link from "next/link";


export default function ProductPage(productData) {
  const { sidebarOpen } = useSidebar();
  const { wishListOpen } = useWishList();
  const [isOpen, setIsOpen] = useState(false);
  const assets = productData?.data;
  const categories = assets.category;
  const products = assets.products;
  const [selectedProduct, setSelectedProduct] = useState([]);

  const handleOpenModal = (product) => {
    setSelectedProduct(product); // Set the selected product
    setIsOpen(true); // Open the modal
  };

  let data = [];

  products?.forEach((item) => {
    const category = item.model.category.category;
    const model = item.model.model;
    const categoryIndex = data.findIndex((cat) => cat.category === category);
    if (categoryIndex === -1) {
      data.push({
        category: category,
        models: [
          {
            modelName: model,
            items: [item],
          },
        ],
      });
    } else {
      const modelIndex = data[categoryIndex].models.findIndex(
        (m) => m.modelName === model
      );
      if (modelIndex === -1) {
        data[categoryIndex].models.push({
          modelName: model,
          items: [item],
        });
      } else {
        data[categoryIndex].models[modelIndex].items.push(item);
      }
    }
  });
  const newData = [];

  categories.forEach((category) => {
    const categoryData = data.find((item) => item.category === category.category);
    if (categoryData) {
      newData.push(categoryData);
    }
  });

  //assigning updated array
  data=newData;

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default context menu from appearing
  };

  const handleDragStart = (e) => {
    e.preventDefault(); // Prevent dragging
  };

  return (
    <div
      className={`${sidebarOpen || wishListOpen ? " blur-lg" : "block"
        } bg-white px-4 py-2 pb-8  md:px-6`}
    >
      <LogoBar />
      <p className="text-[0.70rem] lg:text-lg text-black uppercase tracking-widest mt-2">
        <Link href="/">Home</Link> {">"} Product {">"} Our Collection
      </p>
      <div className="">
        <span className="mt-16 flex justify-center text-xl tracking-[0.3rem] md:tracking-[0.5rem] md:mt-32 md:text-2xl lg:text-4xl lg:mt-40">
          OUR COLLECTIONS
        </span>
        <div className="mt-[3rem] md:mt-[5rem] lg:mt-[7rem] flex flex-wrap gap-1 justify-between px-2 lg:flex-nowrap md:justify-center">
          {categories?.map((category, id) => (
            <div
              key={id}
              className="w-[21%] md:w-[9%] flex flex-col items-center"
            >
              <Link
                href={`#${category.category}`}
                passHref
                scroll={true}
                className="flex flex-col items-center"
              >
                <img
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                  src={category.image}
                  alt="collection1"
                  className="transition duration-150 ease-out hover:ease-in hover:cursor-pointer hover:scale-110 w-[80%]"
                />
              </Link>

              <p className="text-[0.65rem] md:tracking-wider md:text-sm uppercase text-center mt-2">
                {category.category}
              </p>
            </div>
          ))}
        </div>
        <div>
          {data?.map((object, id) => {
            return (
              <div key={id}>
                <div className="w-full bg-e3e3e3 p-4 md:p-6 lg:p-8 mt-6 md:mt-9 lg:mt-12 flex flex-col justify-center">
                  <p className="text-center mt-6 md:mt-8 lg:mt-10 flex justify-center text-xl md:text-2xl lg:text-4xl tracking-[0.35rem] md:tracking-[0.5rem] uppercase">
                    {/* {object?.category} */}
                    <section id={`${object.category}`}>
                      {object?.category}
                    </section>
                  </p>

                  <div className="w-full flex justify-center items-center">
                    <div className="mt-6 md:mt-8 lg:mt-10 flex justify-center w-full lg:w-1/2 pb-8">
                      <p className="text-center text-[12px] md:text-[16px] leading-5  md:leading-6 tracking-wider">
                        {/* {object?.products[0]?.model?.category.category_text} */}
                        {
                          object?.models[0]?.items[0]?.model.category
                            .category_text
                        }
                      </p>
                    </div>
                  </div>
                </div>
                {/* image */}

                <div className="flex justify-center items-center w-full">
                  <div
                    className={`flex justify-center items-center flex-wrap  gap-x-6 gap-y-6 md:gap-y-10 mt-8 md:mt-12 lg:mt-16 xl:mt-20 `}
                  >
                    {object?.models.map((product, i) => {
                      return (
                        <div key={i} className="w-[45%] md:w-[30%]">
                          <button onClick={() => handleOpenModal(product)}>
                            <img
                              loading="lazy"
                              onContextMenu={handleContextMenu}
                              onDragStart={handleDragStart}
                              src={
                                product?.items[0].model
                                  .model_image_with_background
                              }
                              alt="Image1"
                              className="w-full"
                            />
                          </button>

                          <p className="text-sm md:text-md lg:text-lg  md:tracking-wider uppercase text-center mt-2 md:mt-4">
                            {product.modelName}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {isOpen && (
          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            data={selectedProduct}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
      <Contact />
    </div>
  );
}
