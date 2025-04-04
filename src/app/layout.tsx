import type { Metadata } from "next";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "foundation-sites/dist/css/foundation.min.css";
import "@/styles/globals.css";
import Navbar from "@/components/navbar"; 
import Sidebar from "@/components/sidebar"; 

// Font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HOA Advocate",
  description: "HOA Advocate - Your Community Management Solution",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="row expanded" style={{ height: "100vh", margin: 0 }}>
          {/* Sidebar */}
          <div className="columns small-12 medium-3 large-2" style={{ padding: 0 }}>
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="columns small-12 medium-9 large-10" style={{ padding: 0 }}>
            <div className="row expanded" style={{ margin: 0 }}>
              <div className="columns small-12" style={{ padding: 0 }}>
                <Navbar />
              </div>
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