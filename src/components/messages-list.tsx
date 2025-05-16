'use client';

import { useEffect, useState } from 'react';
import { getCommunityMessages } from '@/db/db-actions-cm';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

const MessagesList = () => {
    const [messages, setMessages] = useState<{ title: string; id: number; shortdescription: string }[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const data = await getCommunityMessages(3);
            setMessages(data);
        };

        fetchMessages();
    }, []);

    return (
        <div>
            <ul className="space-y-3">
                {messages.map((msg) => (
                    <li key={msg.id}>
                        <Link
                            href={`/community-messages/${msg.id}`}
                            className="flex items-center space-x-2 py-2 px-3 hover:bg-muted rounded-md transition-colors"
                        >
                            <MessageSquare className="w-4 h-4 text-muted-foreground" />
                            <span className="fp-card-title">{msg.title}</span>
                            
                        </Link>
                        <div className="fp-card-sd"><p>{msg.shortdescription}</p></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessagesList;