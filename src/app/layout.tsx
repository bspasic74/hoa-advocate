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
    <html lang="en" className="">
      <body className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <SessionProvider>
          <SidebarProvider>
          <ActivePageProvider>
              <AppSidebar variant="inset" className='bg-white'/>
              <SidebarInset className='mt-2.5 ml-4 mr-4 flex-1 flex flex-col'>
                <SiteHeader />
                <div className="flex-1 p-5">
                  {children}
                  <Toaster position="top-center" reverseOrder={false} />
                </div>
                {/* Footer */}
                <footer className="bg-white border-t text-sm text-gray-500 text-center py-4">
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