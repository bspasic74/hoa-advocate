export const runtime = "edge"; // This page will be rendered on the Edge Runtime

import { CalendarComponent } from "@/components/calendar"
import { getAllEvents } from "@/db/db-actions-events" 
import { run } from "node:test";

export default async function CalendarPage() {
  const events = await getAllEvents();
  console.log("events", events);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <CalendarComponent initialEvents={events}/>
    </div>
  )
}