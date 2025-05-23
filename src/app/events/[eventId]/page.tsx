export const runtime = 'edge';

import ReadOnlyEditor from '@/components/wyswyg-editor/readonly-editor-component';
import { deleteEvent, getEvent } from '@/db/db-actions-events'; 
import { notFound } from 'next/navigation'
import { format } from "date-fns";
import Link from "next/link";
import { DeleteContentButton } from '@/components/DeleteContentButton';
import { redirect } from "next/navigation";
import { auth } from '@/auth';
import { prepareDatabaseDateForDisplay } from '@/lib/utils';

interface PageProps {
  params: Promise<{
    eventId: string;
  }>;
}

export default async function EventPage({ params }: PageProps) {
  const resolvedParams = await params;
  const session = await auth();
  const eventId = parseInt(resolvedParams.eventId, 10);

  if (isNaN(eventId )) {
    notFound();
  }

  const message = await getEvent(eventId );
  if (!message) {
    notFound();
  }

    async function handleDelete() {
      "use server";
      await deleteEvent(eventId);
      // option: revalidatePath("/events");
      redirect("/events"); 
    }

  return (<>
    <div className="max-w-max px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{message.title}</h1>
      <p className="text-gray-500 text-xl pt-10 pb-10  mb-2">Event Date: {format(prepareDatabaseDateForDisplay(message.eventDate), "PPP")}</p>
      <div className="prose prose-lg">
        {message.description ? (<>
          <ReadOnlyEditor content={message.description} />
          </>
        ) : (
          <p className="text-gray-400 italic">{message.shortdescription}</p>
        )}
      </div>
    </div>
    {session?.user.isAdmin && (
    <div className="flex gap-4">
    <Link href={`/events/${eventId}/edit`}>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
    </Link>

    <form action={handleDelete}>
      <DeleteContentButton/>
    </form>
    </div>
    )}
    </>
  );
}