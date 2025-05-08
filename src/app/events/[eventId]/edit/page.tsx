export const runtime = 'edge';

import { getEvent } from "@/db/db-actions-events";
import { EventForm } from "@/components/event-form";

interface EditEventPageProps {
  params: Promise<{ eventId: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  
  console.log("OPENED EDIT EVENT PAGE *****************");
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

  console.log("initial data: ", event);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-max space-y-6 rounded-lg bg-[#e9e9e9] p-6 shadow-md">
        <h2 className="text-xl font-semibold text-center">Edit Event</h2>
        <EventForm initialData={event} />
      </div>
    </div>
  );
}