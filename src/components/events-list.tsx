'use client';

import { useEffect, useState } from 'react';
import { getEventsList } from '@/db/db-actions-events';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';

const EventsList = () => {
    const [events, setEvents] = useState<{ title: string; id: number; shortdescription: string; eventDate: string }[]>([]);

useEffect(() => {
    const fetchEvents = async () => {
        const data = await getEventsList(3);
        setEvents(
            data.map(event => {
                const date = new Date(event.eventDate);
                const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
                return {
                    id: event.id,
                    title: event.title,
                    shortdescription: event.shortdescription,
                    eventDate: formattedDate,
                };
            })
        );
    };

    fetchEvents();
}, []);
    return (
        <div>
            <ul className="space-y-3">
                {events.map((event) => (
                    <li key={event.id}>
                        <Link
                            href={`/events/${event.id}`}
                            className="flex items-center space-x-2 py-2 px-3 hover:bg-muted rounded-md transition-colors"
                        >
                            <CalendarDays className="w-4 h-4 text-muted-foreground" />
                            <span className="fp-card-title">{event.title}</span>
                        </Link>
                        <div className="fp-card-eventdate"><p>{event.eventDate}</p></div>
                        <div className="fp-card-sd"><p>{event.shortdescription}</p></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsList;
