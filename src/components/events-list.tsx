'use client';

import { useEffect, useState } from 'react';
import { getEventsList } from '@/db/db-actions-events';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';

const EventsList = () => {
    const [events, setEvents] = useState<{ title: string; id: number }[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getEventsList(5);
            setEvents(data);
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
                            <span className="fp-card-text text-muted-foreground">{event.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsList;
