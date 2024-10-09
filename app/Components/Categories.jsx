"use client"


import React, { useState, useMemo } from 'react';
import axios from "axios";
import { baseURL} from '../config';

export const Categories = () => {
  const [selectedImage, setSelectedImage] = useState({});
  const [assets, setAssets]=useState([]);

  useMemo(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${baseURL}gallery`);
        setAssets(response.data);
        console.log(assets)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

 
  return (
    <div className='flex flex-col  w-full md:w-4/5'>
        <div className="hidden md:flex md:gap-2 overflow-x-auto overflow-y-hidden bg-gray-200 p-4 py-2 rounded-md h-40 relative">
          {
            selectedImage?.models?.map((model,key) => (
              <img key={key} src={model.model_image} alt="random" className=' scale-80 cursor-pointer hover:scale-90  ease-in' />
              
            ))

          }
        </div>
        <div className="grid justify-center items-center grid-cols-4 gap-4 mt-4">
          {assets.map((obj, id) => (
            <img
              src={obj.image}
              key={id}
              alt="random"
              className="w-[75%] h-auto cursor-pointer hover:scale-110"
              onClick={() => {
                setSelectedImage(obj);
              }}
            />
          ))}
        </div>

    </div>
  )
}
