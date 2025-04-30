"use client"

export const runtime = 'edge';

import { useSearchParams } from "next/navigation"
import { EventForm } from "@/components/event-form"

export default function NewEventPage() {
  const searchParams = useSearchParams()
  const dateParam = searchParams.get("date") // format YYYY-MM-DD

  return(
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-max space-y-6 rounded-lg bg-[#e9e9e9] p-6 shadow-md">
          <h2 className="text-xl font-semibold text-center">Create Community Message</h2>
          <EventForm />
        </div>
      </div>
    )
   
}