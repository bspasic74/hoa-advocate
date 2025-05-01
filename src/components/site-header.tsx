'use client'

import Link from "next/link"
import { usePathname, useSelectedLayoutSegments } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import { BreadcrumbsHeader } from "./breadcrumbs-header"
import { Crumb } from "./crumb"

export function SiteHeader({ pageTitle }: { pageTitle?: string }) {

  const pathname = usePathname();

  const { data: session } = useSession()

  //const pathSegments = pathname.split("/").filter((segment) => segment);
  const pathnames = pathname.split('/').filter(Boolean);

  const breadcrumbs = pathnames.map((name, idx) => {
    const href = `/${pathnames.slice(0, idx + 1).join('/')}`;
    return {
        segment: name,
        href,
        ...(idx > 0 && {prevSegment: pathnames[idx - 1]}),
        index: idx,
        isLast: idx == pathnames.length - 1,
    }
})

  function toTitleCase(str: string) {
    return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  }

  /*
  const breadcrumbs = pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLast = index === pathSegments.length - 1;
  
      return (
        <BreadcrumbItem key={href}>
          {isLast ? (
            <BreadcrumbLink
              aria-current="page"
              className="text-muted-foreground cursor-default"
            >
              {segment}
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
          )}
        </BreadcrumbItem>
      )
    })
      */

  return (
    <header className="sticky top-0 header-class group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between px-4 lg:px-6">

        {/* Sidebar Trigger and Breadcrumbs */}
        <div className="flex items-center gap-2 max-w-full flex-wrap overflow-hidden">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-2 h-4" />
          {/*<BreadcrumbsHeader pathname={pathname} />*/}
          <Breadcrumb className="text-white whitespace-nowrap overflow-x-auto">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.map((crumb, idx) => (
                <Crumb key={crumb.href} {...crumb} />
              ))}
              {/*breadcrumbs.map((crumb, index) => (

                <span key={index} className="flex flex-row gap-1.5 sm:gap-2.5 items-center">
                  <BreadcrumbSeparator className="text-white" />
                  {crumb}
                </span>
              ))*/}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Login/Register/Logout Buttons */}
        <div className="flex items-center gap-2">
          {!session ? (
            <>
              <Link href="/login">
                <Button className="button-sky-blue text-white rounded-md px-4 py-1 text-sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="button-sky-blue text-white rounded-md px-4 py-1 text-sm">Register</Button>
              </Link>
            </>
          ) : (
            <Button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="button-sky-blue text-white rounded-md px-4 py-1 text-sm"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
