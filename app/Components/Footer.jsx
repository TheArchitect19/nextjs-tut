"use client";

import Image from "next/image";
import Logo from "../assets/NewLogo.png";
import Facebook from "../assets/facebook.png";
import Instagram from "../assets/instagram.png";
import Linkedin from "../assets/linkedin.png";
import Email from "../assets/email.png";
import Marigold from "../assets/marigold.png";
import Metro from "../assets/metro.png";
import Link from "next/link";

function Footer() {
  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default context menu from appearing
  };

  const handleDragStart = (e) => {
    e.preventDefault(); // Prevent dragging
  };

  return (
    <div className="bg-white px-4 md:px-6 py-2 pb-8 h-auto">
      <div className="w-full bg-[#E3E3E3] p-8 md:mt-12 flex justify-center">
        <div className=" w-full md:w-10/12 flex flex-col justify-center items-center">
          <div className="w-full flex flex-col gap-6 md:gap-12 justify-center items-center ">
            <div className="flex w-full justify-around items-end ">
              <Image
                src={Marigold}
                alt="logo"
                className="w-[45px] md:w-[75px]  lg:w-[120px]"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
              />
              <Link href="/">
                <Image
                  src={Logo}
                  alt="logo"
                  className="w-[70px]  md:w-[125px] lg:w-[200px]"
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                />
              </Link>
              <Image
                src={Metro}
                alt="logo"
                className="w-[45px] md:w-[75px]  lg:w-[120px]"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
              />
            </div>

            <div className="flex w-full items-center justify-evenly gap-2">
              <div className="w-full md:w-1/4 gap-1 flex justify-evenly md:justify-between items-center">
                <Link
                  href="https://www.facebook.com/maharajamoldedfurniture"
                  target="_blank"
                  className=" w-6 h-6 md:w-10 md:h-10 rounded-full"
                >
                  <Image
                    src={Facebook}
                    alt="facebook"
                    className=" object-cover h-full w-full"
                  />
                </Link>
                <Link
                  href="https://www.instagram.com/maharajamoldedfurniture/"
                  target="_blank"
                  className=" w-6 h-6 md:w-10 md:h-10 rounded-full"
                >
                  <Image
                    src={Instagram}
                    alt="instagram"
                    className="cursor-pointer text-4xl"
                  />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/maharaja-molded-furniture"
                  target="_blank"
                  className=" w-6 h-6 md:w-10 md:h-10 rounded-full"
                >
                  <Image
                    src={Linkedin}
                    alt="LinkedId"
                    className="cursor-pointer text-4xl"
                  />
                </Link>
                {/* <Link href="https://www.youtube.com/channel/UCclSrevQO_RdIa2ILlacvCw" target="_blank" className=" w-6 h-6 md:w-10 md:h-10 rounded-full">
                    <Image src={Email} alt="email" className="cursor-pointer text-4xl"/>
                  </Link>
                  <Link href="https://twitter.com/MaharajaChair" target="_blank" className=" w-6 h-6 md:w-10 md:h-10 rounded-full">
                    <Image src={Email} alt="email" className="cursor-pointer text-4xl"/>
                  </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
