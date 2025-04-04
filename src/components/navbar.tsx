"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, Calendar, Vote, Settings, LucideIcon } from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Community Messages", href: "/messages", icon: MessageCircle },
  { name: "Calendar", href: "/events", icon: Calendar },
  { name: "Voting", href: "/votes", icon: Vote },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md h-screen flex flex-col p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">HOA Advocate</h2>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map(({ name, href, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  pathname === href ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}