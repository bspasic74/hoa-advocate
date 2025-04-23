'use client';
import { useEffect, useState } from 'react';
import { getEventsList } from '@/db/db-actions-events';
import { Card, CardTitle } from './ui/card';

const EventsList = () => {
    const [events, setEvents] = useState<{title:string,id:number}[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getEventsList(5);
            setEvents(data); // Get the last 5 messages
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <h2>Last Events</h2>
            <ul>
                {events.map((msg) => (
                    <li key={msg.id}>
                        <Card className="p-4 mb-2"
                            onClick={() => window.location.href = `/events/${msg.id}`}
                            style={{ cursor: 'pointer' }}>
                            <CardTitle className="text-sm text-muted-foreground">{msg.title}</CardTitle>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsList;