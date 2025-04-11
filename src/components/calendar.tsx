"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useRouter } from 'next/navigation'
import { Card } from "@/components/ui/card"
import { useCallback } from 'react'

export function CalendarComponent() {
  const router = useRouter()

  const handleEventClick = useCallback((info: any) => {
    const eventId = info.event.id
    router.push(`/events/${eventId}`)
  }, [router])

  const handleDateClick = useCallback((info: any) => {
    const clickedDate = info.dateStr
    router.push(`/events/new?date=${clickedDate}`)
  }, [router])

  const events = [
    {
      id: '1',
      title: 'Board Meeting',
      start: '2025-04-10T10:00:00',
      end: '2025-04-10T11:30:00',
      description: 'Monthly board meeting to discuss neighborhood matters.',
    },
    {
      id: '2',
      title: 'Pool Maintenance',
      start: '2025-04-13T09:00:00',
      end: '2025-04-13T12:00:00',
      description: 'Regular pool cleaning and maintenance.',
    },
  ]

  return (
    <Card className="w-full max-w-6xl p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        eventContent={renderEventContent}
        height="auto"
      />
    </Card>
  )
}

function renderEventContent(eventInfo: any) {
  return (
    <div className="text-sm">
      <b>{eventInfo.timeText}</b>
      <div>{eventInfo.event.title}</div>
    </div>
  )
}