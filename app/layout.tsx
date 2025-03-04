import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
// import localFont from "next/font/local";
import "./globals.css";
import "animate.css";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import { Providers } from "@/lib/providers/providers";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
});

// const josefinSans = localFont({
//   src: [
//     {
//       path: "./fonts/JosefinSans-VariableFont_wght.woff",
//       weight: "100 900",
//       style: "normal",
//     },
//     {
//       path: "./fonts/JosefinSans-Italic-VariableFont_wght.woff",
//       weight: "100 900",
//       style: "italic",
//     },
//   ],
//   variable: "--font-josefin",
// });

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
      <body className={josefin.className}>
        <Providers>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
