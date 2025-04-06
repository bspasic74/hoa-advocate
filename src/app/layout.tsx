import { Metadata } from 'next';
import Navigation from '../components/navigation';
import './globals.css';

// Font imports would go here if using next/font

export const metadata: Metadata = {
  title: 'Your App Name',
  description: 'Your app description',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
          <footer className="bg-gray-50 border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <p className="text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Your Company. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}