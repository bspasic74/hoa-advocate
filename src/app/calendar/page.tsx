import { CalendarComponent } from "@/components/calendar"

export default function CalendarPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <CalendarComponent />
    </div>
  )
}