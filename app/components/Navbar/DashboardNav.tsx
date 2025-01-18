import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import to access current pathname

export default function DashboardNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname(); // Access the current pathname

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const closeSidebar = () => setSidebarOpen(false); // Function to close the sidebar

  // Helper function to check if the link is active
  const isActive = (link: string) =>
    pathname === link ? "bg-gray-700 text-white" : "";

  return (
    <main className='fixed top-0 z-50 w-full border-b bg-gray-800 border-gray-700'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center'>
            <button
              onClick={toggleSidebar}
              className='inline-flex items-center p-2 text-sm text-gray-400 rounded-lg lg:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600'
            >
              <span className='sr-only'>Open sidebar</span>
              <svg
                className='w-6 h-6'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              </svg>
            </button>
            <Link
              href={"/dashboard"}
              className='flex items-center cursor-pointer flex-shrink-0 text-white ml-4'
            >
              <span className='font-semibold text-3xl tracking-tight'>
                nii monney
              </span>
            </Link>
          </div>

          {/* User Profile Dropdown */}
          <div className='flex items-center'>
            <div className='flex items-center ms-3'>
              <div>
                <button
                  ref={buttonRef}
                  type='button'
                  className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600'
                  aria-expanded={dropdownOpen ? "true" : "false"}
                  onClick={toggleDropdown}
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
                  ref={dropdownRef}
                  className='z-50 my-4 text-base list-none divide-y rounded shadow bg-gray-700 divide-gray-600 absolute right-2 top-12 mt-2'
                  id='dropdown-user'
                >
                  <div className='px-4 py-3'>
                    <p className='text-sm text-white'>Nii Monney</p>
                    <p className='text-sm font-medium truncate text-gray-300'>
                      nii.monney@example.com
                    </p>
                  </div>
                  <div className='max-md:hidden'>
                    <ul className='py-1'>
                      {/* <li>
                        <a
                          href='/dashboard'
                          className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white'
                        >
                          Dashboard
                        </a>
                      </li> */}
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed inset-0 z-40 flex transition-all duration-300 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Sidebar overlay */}
        <div
          className='fixed inset-0 bg-black bg-opacity-50'
          onClick={toggleSidebar}
        ></div>
        {/* Sidebar content */}
        <div
          className={`relative w-64 bg-gray-800 text-gray-300 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className='p-4'>
            <h2 className='text-lg font-semibold text-white'>Nii Monney</h2>
            <p className='text-sm text-gray-400'>nii.monney@example.com</p>
          </div>
          <ul className='mt-4 space-y-2'>
            <li>
              <Link
                href='/dashboard'
                onClick={closeSidebar}
                className={`block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white ${isActive(
                  "/dashboard"
                )}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href='/dashboard/projects'
                onClick={closeSidebar}
                className={`block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white ${isActive(
                  "/dashboard/projects"
                )}`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href='/dashboard/add-project'
                onClick={closeSidebar}
                className={`block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white ${isActive(
                  "/dashboard/add-project"
                )}`}
              >
                Add Project
              </Link>
            </li>
            <li>
              <Link
                href='/settings'
                onClick={closeSidebar}
                className={`block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white ${isActive(
                  "/settings"
                )}`}
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                href='/signout'
                onClick={closeSidebar}
                className={`block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white ${isActive(
                  "/signout"
                )}`}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
