"use client";

import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaUsers,
  FaPaintBrush,
  FaFolderPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";
import SignOutButton from "../SignOutButton";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: FaTachometerAlt },
    { href: "/dashboard/projects", label: "Projects", icon: FaPaintBrush },
    {
      href: "/dashboard/add-project",
      label: "Add Project",
      icon: FaFolderPlus,
    },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    if (href === "/dashboard/projects") {
      return (
        pathname.includes("/dashboard/projects") &&
        !pathname.includes("/add-project")
      );
    }
    return pathname === href;
  };

  return (
    <main
      id='logo-sidebar'
      className='fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0 bg-gray-800 border-gray-700'
      aria-label='Sidebar'
    >
      <div className='flex flex-col justify-between h-full px-3 pb-4 overflow-y-auto bg-gray-800'>
        <ul className='space-y-2 font-medium'>
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center p-2 rounded-lg group ${
                  isActiveLink(href)
                    ? "bg-white text-gray-800"
                    : "text-white hover:bg-gray-700"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActiveLink(href)
                      ? "text-gray-800"
                      : "text-gray-500 group-hover:text-white"
                  }`}
                />
                <span className='ms-3'>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}
