
import { Button } from "@/components/ui/button"

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
import { Separator } from "@/components/ui/separator";
import MessagesList from "./messages-list";
import EventsList from "./events-list";
import ProposalsList from "./proposals-list";
import Link from "next/link";


export function SectionCards() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 px-4 lg:px-6">
      <Card className="fp-card-bg">
        <CardHeader className="flex items-center gap-2">
          <CalendarDays className="fp-title-color w-6 h-6" />
          <CardTitle className="fp-title-color text-2xl">Events</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-4">
          <div>
            <EventsList />
          </div>
        </CardContent>
        <Separator />

        <CardFooter>
          <Link href="/events" className="w-full">
            <Button className="button-dark-blue mx-auto">
              Read more
            </Button>
          </Link>
        </CardFooter>

      </Card>

      <Card className="fp-card-bg">
        <CardHeader className="flex items-center gap-2">
          <Megaphone className="fp-title-color w-6 h-6" />
          <CardTitle className="fp-title-color text-2xl">Community Messages</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-4">
          <div>
            <MessagesList />
          </div>
        </CardContent>
        <Separator />

        <CardFooter>
          <Link href="/community-messages" className="w-full">
            <Button className="button-dark-blue mx-auto">
              Read more
            </Button>
          </Link>
        </CardFooter>

      </Card>

      <Card className="fp-card-bg">
        <CardHeader className="flex items-center gap-2">
          <Vote className="fp-title-color w-6 h-6" />
          <CardTitle className="fp-title-color text-2xl">Proposals & Voting</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-4">
          <div>
            <ProposalsList />
          </div>
        </CardContent>
        <Separator />

        <CardFooter>
          <Link href="/proposals" className="w-full">
            <Button className="button-dark-blue mx-auto">
              Read more
            </Button>
          </Link>
        </CardFooter>

      </Card>
    </div>
  )
}