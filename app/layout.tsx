import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "animate.css";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import { Providers } from "@/lib/providers/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nii Monney",
  description: "My portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Providers>
        {/* <script src='https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js'></script> */}
      </body>
    </html>
  );
}
