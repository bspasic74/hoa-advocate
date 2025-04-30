export const runtime = 'edge';

import { getCommunityMessage } from "@/db/db-actions-cm";
import { CMEditorForm } from "@/components/cm-editor-form";

interface EditPageProps {
  params: Promise<{ messageId: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  // Await the promise to get the resolved value
  const resolvedParams = await params;
  const messId = parseInt(resolvedParams.messageId, 10);

  // Handle potential parsing errors
  if (isNaN(messId)) {
    return <div>Invalid message ID</div>;
  }

  const message = await getCommunityMessage(messId);

  if (!message) {
    return <div>Message not found</div>;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-max space-y-6 rounded-lg bg-[#e9e9e9] p-6 shadow-md">
        <h2 className="text-xl font-semibold text-center">Edit Community Message</h2>
        <CMEditorForm initialData={message} />
      </div>
    </div>
  );
}