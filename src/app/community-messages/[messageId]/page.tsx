export const runtime = 'edge';

import ReadOnlyEditor from '@/components/wyswyg-editor/readonly-editor-component';
import { getCommunityMessage } from '@/db/db-actions-cm'; 
import { notFound } from 'next/navigation';
import React from 'react';
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
import { deleteCommunityMessage } from "@/db/db-actions-cm";
import { DeleteContentButton } from '@/components/DeleteContentButton';
import Link from "next/link";
import { auth } from '@/auth';

interface PageProps {
  params: Promise<{
    messageId: string;
  }>;
}

export default async function CommunityMessagePage({ params }: PageProps) {
  // Await the promise to get the resolved value
  const resolvedParams = await params;
  const session = await auth();
  const messageId = parseInt(resolvedParams.messageId, 10);

  if (isNaN(messageId)) {
    notFound();
  }

  const message = await getCommunityMessage(messageId);

  if (!message) {
    notFound(); // shows 404 page
  }

  async function handleDelete() {
    "use server";
    await deleteCommunityMessage(messageId);
    // option: revalidatePath("/community-messages");
    redirect("/community-messages"); 
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{message.title}</h1>
      <p className="text-gray-500 text-sm mb-2">Category: {message.category}</p>
      <div className="prose prose-lg">
        {message.body ? (<>
          <ReadOnlyEditor content={message.body} />
          </>
        ) : (
          <p className="text-gray-400 italic">{message.shortdescription}</p>
        )}
      </div>
      {session?.user.isAdmin && (
      <div className="flex gap-4">
        <Link href={`/community-messages/${messageId}/edit`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
        </Link>

        <form action={handleDelete}>
          <DeleteContentButton onDelete={handleDelete} />
        </form>
      </div>
      )};
    </div>
  );
}
