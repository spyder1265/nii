"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import "animate.css";
import StyledComponentsRegistry from "../../lib/AntdRegistry";
import DashboardNav from "../components/Navbar/DashboardNav";
import Sidebar from "../components/SideBar/Sidebar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <DashboardNav />
          <Sidebar />
          <Toaster position='top-right' reverseOrder={false} />
          <div className='p-4 sm:ml-64 mt-14'>
            <div className='p-4 mt-5'>{children}</div>
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
