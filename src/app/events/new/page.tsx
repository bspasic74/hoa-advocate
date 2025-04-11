"use client"

import { useSearchParams } from "next/navigation"
import { EventForm } from "@/components/event-form"

export default function NewEventPage() {
  const searchParams = useSearchParams()
  const dateParam = searchParams.get("date") // format YYYY-MM-DD

  return <EventForm initialDate={dateParam ? new Date(dateParam) : undefined} />
}