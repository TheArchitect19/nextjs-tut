"use client";
import Image from "next/image";
import { LogoBar } from "../Components/LogoBar.jsx";
import { Contact } from "../Components/Contact.jsx";
import banner from "../assets/banner3.png";
import { useSidebar } from "../contexts/index.js";
import { useWishList } from "../contexts/WishListContext";
import Link from "next/link";
export default function Page() {
  const { sidebarOpen } = useSidebar();
  const { wishListOpen } = useWishList();

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default context menu from appearing
  };

  const handleDragStart = (e) => {
    e.preventDefault(); // Prevent dragging
  };

  return (
    <div
      className={`${
        sidebarOpen || wishListOpen ? " blur-lg" : "block"
      } bg-white px-4 py-2 pb-8  md:px-6`}
    >
      <LogoBar />
      <p className="text-[0.70rem] lg:text-lg text-black uppercase tracking-widest mt-2">
        <Link href="/">Home</Link> {">"} Contact us
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

      <Contact />
    </div>
  );
}
