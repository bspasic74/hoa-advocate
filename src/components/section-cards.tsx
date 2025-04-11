
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

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:px-6">
    <Card className="shadow-md rounded-xl bg-gradient-to-t from-primary/5 to-card dark:bg-card border-[#e9e9e9]">
      <CardHeader className="flex items-center gap-2">
        <CalendarDays className="text-green-500 w-6 h-6" />
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Next HOA meeting on April 12th at 6PM.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-black text-white rounded-md mx-auto">Read more</Button>
      </CardFooter>
    </Card>
  
    <Card className="shadow-md rounded-xl bg-gradient-to-t from-primary/5 to-card dark:bg-card border-[#e9e9e9]">
      <CardHeader className="flex items-center gap-2">
        <Users className="text-green-500 w-6 h-6" />
        <CardTitle>Recent Announcements</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Maintenance notice posted by the board.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-black text-white rounded-md mx-auto">Read more</Button>
      </CardFooter>
    </Card>
  
    <Card className="shadow-md rounded-xl bg-gradient-to-t from-primary/5 to-card dark:bg-card border-[#e9e9e9]">
      <CardHeader className="flex items-center gap-2">
        <Vote className="text-green-500 w-6 h-6" />
        <CardTitle>Active Voting</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Pool renovation vote open until April 10th.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-black text-white rounded-md mx-auto">Read more</Button>
      </CardFooter>
    </Card>
  
    <Card className="shadow-md rounded-xl bg-gradient-to-t from-primary/5 to-card dark:bg-card border-[#e9e9e9]">
      <CardHeader className="flex items-center gap-2">
        <Megaphone className="text-green-500 w-6 h-6" />
        <CardTitle>Community Messages</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Street repairs on Oak Drive.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-black text-white rounded-md mx-auto">Read more</Button>
      </CardFooter>
    </Card>
  </div>
  )
}