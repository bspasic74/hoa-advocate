'use client';
import { useEffect, useState } from 'react';
import { getCommunityMessages } from '@/db/db-actions-cm';
import { Card, CardTitle } from './ui/card';

const MessagesList = () => {
    const [messages, setMessages] = useState<{title:string,id:number}[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const data = await getCommunityMessages(5);
            setMessages(data); // Get the last 5 messages
        };

        fetchMessages();
    }, []);

    return (
        <div>
            <h2>Last Community Messages</h2>
            <ul>
                {messages.map((msg) => (
                    <li key={msg.id}>
                        <Card className="p-4 mb-2"
                            onClick={() => window.location.href = `/community-messages/${msg.id}`}
                            style={{ cursor: 'pointer' }}>
                            <CardTitle className="text-sm text-muted-foreground">{msg.title}</CardTitle>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessagesList;