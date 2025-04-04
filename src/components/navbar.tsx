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
    <div className="sidebar" style={{ 
      backgroundColor: "white", 
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)", 
      height: "100%", 
      padding: "1rem" 
    }}>
      <div className="row">
        <div className="columns small-12">
          <h2 className="h4" style={{ 
            fontWeight: "600", 
            color: "#2c3e50", 
            marginBottom: "1.5rem" 
          }}>HOA Advocate</h2>
        </div>
      </div>
      
      <nav>
        <ul className="vertical menu" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {menuItems.map(({ name, href, icon: Icon }) => (
            <li key={href} style={{ marginBottom: "0.5rem" }}>
              <Link
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  transition: "all 0.3s ease",
                  backgroundColor: pathname === href ? "#e6f0ff" : "transparent",
                  color: pathname === href ? "#106bd5" : "#666666"
                }}
              >
                <Icon style={{ 
                  width: "1.25rem", 
                  height: "1.25rem", 
                  marginRight: "0.75rem" 
                }} />
                <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}