"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Separator } from "@/components/ui/separator";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import {
    CalendarDays,
    Megaphone,
    Vote,
    Users,
  } from 'lucide-react';

export function AdminPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:px-6">
    <Card className="fp-card-bg shadow-md rounded-xl bg-gradient-to-t from-primary/5 to-card dark:bg-card border-[#e9e9e9]">
      <CardHeader className="flex items-center gap-2">
        <CalendarDays className="fp-title-color w-6 h-6" />
        <CardTitle className="fp-title-color text-2xl">Events Panel</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="grid gap-4">
        <div>
          <p className="text-lg text-muted-foreground">
            Add and adminisrate events
          </p>
        </div>
      </CardContent> 
      <Separator />     
      <CardFooter>
        <Link href="/events" className="w-full">
          <Button className="button-dark-blue text-white rounded-md mx-auto">Events</Button>
        </Link>
      </CardFooter>

    </Card>
  
    <Card className="fp-card-bg shadow-md rounded-xl bg-gradient-to-t from-primary/5 to-card dark:bg-card border-[#e9e9e9]">
      <CardHeader className="flex items-center gap-2">
        <Users className="fp-title-color w-6 h-6" />
        <CardTitle className="fp-title-color text-2xl">Users Panel</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="grid gap-4">
        <div>
          <p className="text-lg text-muted-foreground">
            Administrate users
          </p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter>
      <Link href="/user">
        <Button className="button-dark-blue text-white rounded-md mx-auto">Users</Button>
      </Link>
      </CardFooter>
    </Card>
  
    <Card className="fp-card-bg shadow-md rounded-xl bg-gradient-to-t from-primary/5 to-card dark:bg-card border-[#e9e9e9]">
      <CardHeader className="flex items-center gap-2">
        <Vote className="fp-title-color w-6 h-6" />
        <CardTitle className="fp-title-color text-2xl">Add Proposals</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="grid gap-4">
        <div>
          <p className="text-lg text-muted-foreground">
            Add and administrate proposals
          </p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter>
      <Link href="/proposal-editor">
        <Button className="button-dark-blue text-white rounded-md mx-auto">Proposals and Votes</Button>
      </Link>
      </CardFooter>
    </Card>
  
    <Card className="fp-card-bg shadow-md rounded-xl bg-gradient-to-t from-primary/5 to-card dark:bg-card border-[#e9e9e9]">
      <CardHeader className="flex items-center gap-2">
        <Megaphone className="fp-title-color w-6 h-6" />
        <CardTitle className="fp-title-color text-2xl">Add Community Messages</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="grid gap-4">
        <div>
          <p className="text-lg text-muted-foreground">
            Add and administrate Community Messages
          </p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter>
      <Link href="/cm-editor">
        <Button className="button-dark-blue text-white rounded-md mx-auto">Community messages</Button>
       </Link>
      </CardFooter>
    </Card>

    <Card className="fp-card-bg shadow-md rounded-xl bg-gradient-to-t from-primary/5 to-card dark:bg-card border-[#e9e9e9]">
      <CardHeader className="flex items-center gap-2">
        <Megaphone className="fp-title-color w-6 h-6" />
        <CardTitle className="fp-title-color text-2xl">Verified Addresses</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="grid gap-4">
        <div>
          <p className="text-lg text-muted-foreground">
            Add and ddmnistrate Verified Addresses
          </p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter>
      <Link href="/verified-addresses">
        <Button className="button-dark-blue text-white rounded-md mx-auto">Verified Addresses</Button>
       </Link>
      </CardFooter>
    </Card>
  </div>
  )
}