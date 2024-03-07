import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plate Recognition Admin Page",
  description: "Admin page for Plate Recognition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[url('/img/memphis-bg.jpg')] w-full min-h-screen`}>
        <ToastContainer />
        <main className="relative">{children}</main>
        {/* tadi ada class overflow-hidden diatas */}
      </body>
    </html>
  );
}
