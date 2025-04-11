"use client"

import { useSearchParams } from "next/navigation"
import { EventForm } from "@/components/event-form"
import { Suspense } from "react"
export const runtime = "edge";

function SearchEventForm() {
  const searchParams = useSearchParams()
  const dateParam = searchParams.get("date") // format YYYY-MM-DD

  return <EventForm initialDate={dateParam ? new Date(dateParam) : undefined} />
}

export default function NewEventPage() {
  return (
    <Suspense>
      <SearchEventForm />
    </Suspense>
  )
}