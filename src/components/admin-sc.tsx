"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

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
    <Card className="shadow-md rounded-xl bg-gradient-to-t from-primary/5 to-card dark:bg-card border-[#e9e9e9]">
      <CardHeader className="flex items-center gap-2">
        <CalendarDays className="text-green-500 w-6 h-6" />
        <CardTitle>Events Panel</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Add and adminisrate events
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-black text-white rounded-md mx-auto">Events</Button>
      </CardFooter>
    </Card>
  
    <Card className="shadow-md rounded-xl bg-gradient-to-t from-primary/5 to-card dark:bg-card border-[#e9e9e9]">
      <CardHeader className="flex items-center gap-2">
        <Users className="text-green-500 w-6 h-6" />
        <CardTitle>Users Panel</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Administrate users
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-black text-white rounded-md mx-auto">Users</Button>
      </CardFooter>
    </Card>
  
    <Card className="shadow-md rounded-xl bg-gradient-to-t from-primary/5 to-card dark:bg-card border-[#e9e9e9]">
      <CardHeader className="flex items-center gap-2">
        <Vote className="text-green-500 w-6 h-6" />
        <CardTitle>Add Proposals</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Add and administrate proposals
          </p>
        </div>
      </CardContent>
      <CardFooter>
      <Link href="/proposal-editor">
        <Button className="bg-black text-white rounded-md mx-auto">Proposals and Votes</Button>
      </Link>
      </CardFooter>
    </Card>
  
    <Card className="shadow-md rounded-xl bg-gradient-to-t from-primary/5 to-card dark:bg-card border-[#e9e9e9]">
      <CardHeader className="flex items-center gap-2">
        <Megaphone className="text-green-500 w-6 h-6" />
        <CardTitle>Add Community Messages</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Add and administrate Community Messages
          </p>
        </div>
      </CardContent>
      <CardFooter>
      <Link href="/cm-editor">
        <Button className="bg-black text-white rounded-md mx-auto">Community messages</Button>
       </Link>
      </CardFooter>
    </Card>
  </div>
  )
}