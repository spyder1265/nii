import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ subsets: ["latin"] });

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
      <body className={orbitron.className}>{children}</body>
    </html>
  );
}
