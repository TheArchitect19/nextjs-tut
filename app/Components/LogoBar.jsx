import React from 'react';
import Logo from "../assets/NewLogo.png";
import Image from 'next/image';
import Link from 'next/link'
export const LogoBar = () => {

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default context menu from appearing
  };

  const handleDragStart = (e) => {
    e.preventDefault(); // Prevent dragging
  };
  return (
    <div className='w-full bg-e3e3e3 shadow-lg md:shadow-xl p-1 flex justify-center items-center px-6 py-2 md:-py-2'>
        <Link href="/">
              <Image src={Logo} alt="logo" className='w-[100px] h-[60px] md:h-[100px] md:w-[180px]' onContextMenu={handleContextMenu} onDragStart={handleDragStart} />
        </Link>
    </div>  
  )
}
