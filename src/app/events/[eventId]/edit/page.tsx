export const runtime = 'edge';

import { getEvent } from "@/db/db-actions-events";
import { EventForm } from "@/components/event-form";

interface EditEventPageProps {
  params: Promise<{ eventId: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
    // Await the promise to get the resolved value
    const resolvedParams = await params;
    const messEvId = parseInt(resolvedParams.eventId, 10);
  
  // Handle potential parsing errors
  if (isNaN(messEvId)) {
    return <div>Invalid event ID</div>;
  }
  
  const event = await getEvent(messEvId);

  if (!event) {
    return <div>Event not found</div>;
  }
      
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Event</h1>
      <EventForm initialData={event} />
    </div>
  );
}