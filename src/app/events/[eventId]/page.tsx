export const runtime = 'edge';

import ReadOnlyEditor from '@/components/wyswyg-editor/readonly-editor-component';
import { getEvents } from '@/db/db-actions-events'; 
import { notFound } from 'next/navigation'
import { format } from "date-fns";

interface PageProps {
  params: {
    eventId: string;
  };
}

export default async function EventPage(props: PageProps) {
  const { eventId } = await props.params;

  const parsedId = parseInt(eventId, 10);
  if (isNaN(parsedId)) {
    notFound();
  }

  const message = await getEvents(parsedId);
  if (!message) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{message.title}</h1>
      <p className="text-gray-500 text-sm mb-2">Event Date: {format(new Date(message.eventDate), "PPP")}</p>
      <div className="prose prose-lg">
        {message.description ? (
          <ReadOnlyEditor content={message.description} />
        ) : (
          <p className="text-gray-400 italic">{message.shortdescription}</p>
        )}
      </div>
    </div>
  );
}