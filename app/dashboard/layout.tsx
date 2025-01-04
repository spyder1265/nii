"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import "animate.css";
import StyledComponentsRegistry from "../../lib/AntdRegistry";
import DashboardNav from "../components/Navbar/DashboardNav";
import Sidebar from "../components/SideBar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <DashboardNav />
        <Sidebar />
        <StyledComponentsRegistry>
          <div className="'p-4 sm:ml-64 mt-14">
            <div className='p-4 mt-14'>{children}</div>
          </div>
        </StyledComponentsRegistry>
        {/* <script src='https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js'></script> */}
      </body>
    </html>
  );
}
