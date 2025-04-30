import { Metadata } from 'next';
import Navigation from '@/components/navigation';
import Sidebar from '@/components/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SiteHeader } from '@/components/site-header';
import './globals.css';
import { ActivePageProvider } from '@/context/ActivePageContext';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { Playfair_Display, Oswald } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['300', '400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HOA Advocate',
  description: 'Community portal for homeowners and admins',

};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={`${playfair.variable} ${oswald.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
      <div className="flex flex-1">
        <SessionProvider>
          <SidebarProvider>
          <ActivePageProvider>
              <AppSidebar variant="inset" className='bg-white'/>
              <SidebarInset className='sidebar-inset-class mt-2.5 ml-4 mr-4 flex-1 flex flex-col'>
                <SiteHeader />
                <div className="flex-1 p-5">
                  {children}
                  <Toaster position="top-center" reverseOrder={false} />
                </div>
                {/* Footer */}
                <footer className="footer-class bg-white border-t text-sm text-gray-500 text-center py-4">
                  © {new Date().getFullYear()} HOA Advocate. All rights reserved.
                </footer>
              </SidebarInset>
            </ActivePageProvider>
          </SidebarProvider>
        </SessionProvider>
        </div>
      </body>
    </html>
  );
}