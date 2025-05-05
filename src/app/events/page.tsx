export const runtime = "edge"; // This page will be rendered on the Edge Runtime

import { CalendarComponent } from "@/components/calendar"
import { getAllEvents } from "@/db/db-actions-events" 
import { run } from "node:test";

export default async function CalendarPage() {
  const events = await getAllEvents();
  console.log("events", events);
  return (
    <div className="flex flex-col items-center justify-center bg-muted md:p-3">
      <CalendarComponent initialEvents={events}/>
    </div>
  )
}