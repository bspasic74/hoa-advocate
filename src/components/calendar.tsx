'use client'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRouter } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { useCallback } from 'react';
import { getAllEvents } from '@/db/db-actions-events';
import { title } from 'process';
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { prepareDatabaseDateForDisplay } from '@/lib/utils';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  description: string;
}

interface InitialEvent {
  id: number;
  title: string;
  eventDate: Date;
  shortdescription: string;
}

interface Props {
  initialEvents: InitialEvent[]
}


export function CalendarComponent({initialEvents} : Props) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    console.log("initialEvents", initialEvents);
    initialEvents.forEach(event => {
      console.log("Original eventDate from DB:", event.eventDate); // ← OVO DODAJ
    });

    const formatted: CalendarEvent[] = initialEvents.map(event => ({
      id: event.id.toString(),
      title: event.title,
      //start: new Date( event.eventDate.getUTCFullYear(), event.eventDate.getUTCMonth(), event.eventDate.getUTCDate() ).toISOString(),
      start: prepareDatabaseDateForDisplay(event.eventDate).toLocaleDateString('sv-SE'), // format: YYYY-MM-DD
      description: event.shortdescription,
      allDay: true,
    }))
    setEvents(formatted)
  }, [initialEvents])

  const handleEventClick = useCallback((info: any) => {
    const eventId = info.event.id
    console.log("eventId", eventId);
    router.push(`/events/${eventId}`)
  }, [router])

  const handleDateClick = useCallback((info: any) => {
    if(!session?.user?.isAdmin) {
      return;
    }
    const clickedDate = info.dateStr // format: YYYY-MM-DD
    router.push(`/events/new?date=${clickedDate}`)
  }, [router])


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
    <div  >
    <div className="text-sm text-wrap">
      <b>{eventInfo.event.title}</b>
    {/*  <div>{eventInfo.event.extendedProps.description}</div> */}
    </div>
    </div>
  )
}