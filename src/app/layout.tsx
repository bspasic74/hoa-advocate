import { Metadata } from 'next';
import Navigation from '@/components/navigation';
import Sidebar from '@/components/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SiteHeader } from '@/components/site-header';
import './globals.css';
import { ActivePageProvider } from '@/context/ActivePageContext';
import { SessionProvider } from 'next-auth/react';

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


export function RootLayout_old({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar (left) */}
          <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <div className="flex flex-col flex-1">
            {/* Top Navigation */}
            <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
              <Navigation />
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50">
              <div className="p-6">{children}</div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t text-sm text-gray-500 text-center py-4">
              © {new Date().getFullYear()} HOA Advocate. All rights reserved.
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}