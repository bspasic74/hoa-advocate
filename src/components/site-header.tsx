'use client';

import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button" 
import { useActivePage } from "@/context/ActivePageContext"
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { auth } from "@/auth";

export function SiteHeader() {
  const { data: session } = useSession();

  const { activePage } = useActivePage()
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        {/* Sidebar Triger and Title*/}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium">{activePage}</h1>
        </div>

        {/* Login and Register Buttons */}
        <div className="flex items-center gap-2">
        {!session && <><Link href="/login">
          <Button className="bg-black text-white rounded-md px-4 py-1 text-sm">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button className="bg-black text-white rounded-md px-4 py-1 text-sm">
            Register
          </Button>
        </Link></>}
        {session && <Button onClick={() => signOut()} className="bg-black text-white rounded-md px-4 py-1 text-sm">Logout</Button>}
        </div>
      </div>
    </header>
  )
}
