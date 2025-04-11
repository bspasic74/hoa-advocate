'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessagesSquare,
  Calendar,
  Vote,
  Users,
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Messages', href: '/dashboard/messages', icon: MessagesSquare },
    { name: 'Events', href: '/dashboard/events', icon: Calendar },
    { name: 'Voting', href: '/dashboard/proposals', icon: Vote },
    { name: 'Users', href: '/dashboard/users', icon: Users },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 shrink-0 bg-white border-r h-full hidden md:flex flex-col p-4">
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-xl font-semibold text-gray-800">HOA Advocate</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive(item.href)
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;