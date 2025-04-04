import type { Metadata } from "next";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "foundation-sites/dist/css/foundation.min.css"; // Foundation CSS instead of Tailwind
import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HOA Advocate",
  description: "HOA Advocate - Your Community Management Solution",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "#f3f3f3", color: "#333333" }}>
        <div className="row expanded" style={{ height: "100vh", margin: 0 }}>
          {/* Sidebar */}
          <div className="columns small-12 medium-3 large-2" style={{ padding: 0 }}>
            <Sidebar />
          </div>
          
          {/* Main content area */}
          <div className="columns small-12 medium-9 large-10" style={{ padding: 0 }}>
            <div className="row expanded" style={{ height: "100%", margin: 0 }}>
              <div className="columns small-12" style={{ padding: 0 }}>
                <Navbar />
              </div>
            </div>
            <div className="row expanded" style={{ height: "calc(100% - 60px)", margin: 0 }}>
              <div className="columns small-12" style={{ padding: "1.5rem", overflowY: "auto" }}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}