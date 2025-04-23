'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useSession } from 'next-auth/react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const session = useSession();
  const isAdmin = session.data?.user?.isAdmin || false; // Adjust this based on your user object structure  
  
  return (
    <nav className="bg-white shadow z-10 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-800">
            HOA Advocate
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {isOpen && (
        <div className="px-4 pb-4 space-y-2">
          <MobileNavItem href="/dashboard" label="Dashboard" active={isActive('/dashboard')} />
          <MobileNavItem href="/dashboard/messages" label="Messages" active={isActive('/dashboard/messages')} />
          <MobileNavItem href="/dashboard/events" label="Events" active={isActive('/dashboard/events')} />
          <MobileNavItem href="/dashboard/proposals" label="Voting" active={isActive('/dashboard/proposals')} />
          <MobileNavItem href="/contact" label="Contact" active={isActive('/contact')} />
        </div>
      )}
    </nav>
  );
};

const MobileNavItem = ({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        active ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </Link>
  );
};

export default Navigation;