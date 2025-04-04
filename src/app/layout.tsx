import type { Metadata } from "next";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HOA Advocate",
  description: "HOA Advocate ",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />

          <div className="flex flex-col flex-1">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
