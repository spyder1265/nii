"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { HiMiniBars3, HiXMark } from "react-icons/hi2";

interface INavbar {
  fixed?: boolean;
}

const Navbar: React.FC<INavbar> = ({ fixed }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={cn(
        "flex items-center justify-between z-40  top-0 left-0 right-0 backdrop-blur-md flex-wrap bg-transparent p-6 md:px-56",
        fixed ? "fixed" : "relative"
      )}
    >
      <div className='flex md:hidden items-center cursor-pointer flex-shrink-0 text-white mr-6'>
        <span
          className='font-semibold text-3xl tracking-tight cursor-pointer animate__animated logo animate__rubberBand'
          aria-disabled
        >
          nii monney
        </span>
      </div>
      <div className='block lg:hidden'>
        {isMenuOpen ? (
          <button
            className='flex items-center px-3 py-2 relative z-10 rounded text-gray-200 hover:text-white '
            onClick={toggleMenu}
          >
            <HiXMark />
          </button>
        ) : (
          <button
            className='flex items-center px-3 py-2 relative z-10 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white'
            onClick={toggleMenu}
          >
            <HiMiniBars3 />
          </button>
        )}
      </div>
      <div
        className={`w-full block z-20 bg-[rgb(29, 32, 38)] transition-all duration-400 translate-y-2 flex-grow lg:flex lg:items-center lg:w-auto ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className='text-sm lg:flex-grow'>
          <a
            href='/'
            className={`block mt-4 lg:inline-block lg:mt-0  mr-6 ${
              pathname === "/"
                ? "text-gray-400 hover:cursor-not-allowed"
                : "text-gray-200 hover:text-white hover:scale-105 transition-all duration-500"
            } `}
            aria-disabled={pathname === "/"}
          >
            Home
          </a>
          <a
            href='/about'
            className={`block mt-4 lg:inline-block lg:mt-0  mr-6 ${
              pathname === "/about"
                ? "text-gray-400 hover:cursor-not-allowed"
                : "text-gray-200 hover:text-white hover:scale-105 transition-all duration-500"
            } `}
          >
            About
          </a>
          <a
            href='/projects'
            className={`block mt-4 lg:inline-block lg:mt-0  mr-6 ${
              pathname.includes("/projects")
                ? "text-gray-400 hover:cursor-not-allowed"
                : "text-gray-200 hover:text-white hover:scale-105 transition-all duration-500"
            } `}
          >
            Projects
          </a>
        </div>
      </div>
      <div
        className='md:flex hidden items-center cursor-pointer flex-shrink-0 text-white mr-6'
        aria-disabled
      >
        <span className='font-semibold text-3xl tracking-tight cursor-pointer animate__animated logo animate__rubberBand'>
          nii monney
        </span>
      </div>
    </nav>
  );
};
export default Navbar;
