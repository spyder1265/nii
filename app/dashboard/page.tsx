"use client";

// import { useState, useEffect, useRef } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaPaintBrush,
  FaFolderPlus,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";
import DashboardNav from "../components/Navbar/DashboardNav";

export default function Dashboard() {
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference for the dropdown
  // const buttonRef = useRef<HTMLButtonElement | null>(null); // Reference for the button

  // // Close the dropdown when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(e.target as Node) &&
  //       buttonRef.current &&
  //       !buttonRef.current.contains(e.target as Node)
  //     ) {
  //       setDropdownOpen(false); // Close the dropdown
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  // const toggleDropdown = () => {
  //   setDropdownOpen((prev) => !prev); // Toggle dropdown state
  // };

  return (
    <>
      {/* <DashboardNav /> */}
      {/* <nav className='fixed top-0 z-50 w-full border-b bg-gray-800 border-gray-700'>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start rtl:justify-end'>
              <Link
                href={"/dashboard"}
                className='flex max-md:hidden items-center cursor-pointer flex-shrink-0 text-white mr-6'
              >
                <span
                  className='font-semibold text-3xl tracking-tight cursor-pointer animate__animated logo animate__rubberBand'
                  aria-disabled
                >
                  nii monney
                </span>
              </Link>
            </div>
            <div className='flex items-center'>
              <div className='flex items-center ms-3'>
                <div>
                  <button
                    ref={buttonRef} // Reference the button
                    type='button'
                    className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600'
                    aria-expanded={dropdownOpen ? "true" : "false"}
                    onClick={toggleDropdown} // Toggle the dropdown
                  >
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='w-8 h-8 rounded-full'
                      src='/img/DSC_0075.png'
                      alt='user photo'
                    />
                  </button>
                </div>
                {dropdownOpen && (
                  <div
                    ref={dropdownRef} // Reference the dropdown
                    className='z-50 my-4 text-base list-none divide-y rounded shadow bg-gray-700 divide-gray-600 absolute right-2 top-12 mt-2'
                    id='dropdown-user'
                  >
                    <div className='px-4 py-3'>
                      <p className='text-sm text-white'>Nii Monney</p>
                      <p className='text-sm font-medium truncate text-gray-300'>
                        nii.monney@example.com
                      </p>
                    </div>
                    <ul className='py-1'>
                      <li>
                        <a
                          href='/dashboard'
                          className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white'
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href='/settings'
                          className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white'
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href='/signout'
                          className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white'
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav> */}

      {/* <div className='p-4 sm:ml-64'> */}
      <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700'>
        <div className='grid grid-cols-3 gap-4 mb-4'>
          <div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
            <FaTachometerAlt className='w-8 h-8 text-gray-400 dark:text-gray-500' />
          </div>
          <div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
            <FaUsers className='w-8 h-8 text-gray-400 dark:text-gray-500' />
          </div>
          <div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
            <FaPaintBrush className='w-8 h-8 text-gray-400 dark:text-gray-500' />
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
