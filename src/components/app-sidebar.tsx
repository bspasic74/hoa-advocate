"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Calendar,
  Vote,
  ArrowUpCircleIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  MessagesSquare,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  ShieldUser,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/ui/nav-user"
import { useSession } from "next-auth/react"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Community Messages",
      url: "/community-messages",
      icon: MessagesSquare,
    },
    {
      title: "Events",
      url: "/events",
      icon: Calendar,
    },
    {
      title: "Proposals & Voting",
      url: "/proposals",
      icon: Vote,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Reports",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: FileIcon,
    },
  ],
}

const adminData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Community Messages",
      url: "/community-messages",
      icon: MessagesSquare,
    },
    {
      title: "Events",
      url: "/events",
      icon: Calendar,
    },
    {
      title: "Proposals & Voting",
      url: "/proposals",
      icon: Vote,
    },
    {
      title: "Admin",
      url: "#",
      icon: ShieldUser,
      items: [
        {
          title: "Add Community Message",
          url: "/cm-editor",
        },
        {
          title: "Add Event",
          url: "/events",
        },
        {
          title: "Add Proposal",
          url: "/proposal-editor",
        },
        {
          title: "User Management",
          url: "/user",
        },
        {
          title: "Verified Addresses",
          url: "/verified-addresses",
        },
      ],
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Reports",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: FileIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const session = useSession();
  console.log(session.data);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">HOA Advocate</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={
            !session?.data?.user
              ? []
              : (session.data?.user.isAdmin ? adminData.navMain : data.navMain).filter(
                (item) => item.url !== undefined
              )
          }
        />
      </SidebarContent>
      {/* {session.data?.user && (
        <SidebarFooter>
          <NavUser
            user={{
              id: session.data.user.id ?? "",
              name: session.data.user.name ?? "",
              email: session.data.user.email ?? "",
              avatar: (session.data.user as any)?.avatar ?? "",
            }}
          />
        </SidebarFooter>
      )}*/}
      {session.data?.user && (
        <SidebarFooter>
          <button
            onClick={() => window.location.href = `/user/${session.data.user.id}`}
            className="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
          >
            {"avatar" in session.data.user && session.data.user.avatar ? (
              <img
                src={String(session.data.user.avatar)}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600" />
            )}
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {session.data.user.name ?? "User"}
            </span>
          </button>
        </SidebarFooter>
      )}
    </Sidebar>
  )
}
