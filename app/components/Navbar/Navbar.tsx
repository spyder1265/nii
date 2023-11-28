"use client";
import React, { useState } from "react";

interface INavbar {}

const Navbar: React.FC<INavbar> = ({}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log("clicked");
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='flex items-center justify-between z-40 fixed top-0 left-0 right-0 backdrop-blur-md flex-wrap bg-transparent p-6 md:px-56'>
      <div className='flex md:hidden items-center flex-shrink-0 text-white mr-6'>
        <span className='font-semibold text-3xl tracking-tight logo'>
          nii monney
        </span>
      </div>
      <div className='block lg:hidden'>
        <button
          className='flex items-center px-3 py-2 relative z-10 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white'
          onClick={toggleMenu}
        >
          <svg
            className='fill-current h-3 w-3'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Menu</title>
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block z-20 bg-[rgb(29, 32, 38)] transition-all duration-400 translate-y-2 flex-grow lg:flex lg:items-center lg:w-auto ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className='text-sm lg:flex-grow'>
          <a
            href='#responsive-header'
            className='block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4'
          >
            Home
          </a>
          <a
            href='#responsive-header'
            className='block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4'
          >
            About
          </a>
          <a
            href='#responsive-header'
            className='block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white'
          >
            Projects
          </a>
        </div>
      </div>
      <div className='md:flex hidden items-center flex-shrink-0 text-white mr-6'>
        <span className='font-semibold text-3xl tracking-tight logo'>
          nii money
        </span>
      </div>
    </nav>
  );
};
export default Navbar;
