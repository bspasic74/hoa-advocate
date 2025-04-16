export const runtime = 'edge';

import { getCommunityMessage } from "@/db/db-actions-cm";
import { CMEditorForm } from "@/components/cm-editor-form";

interface EditPageProps {
  params: { messageId: string };
}

export default async function EditPage({ params }: EditPageProps) {
  const messId = parseInt(params.messageId, 10);
  
  // Handle potential parsing errors
  if (isNaN(messId)) {
    return <div>Invalid message ID</div>;
  }
  
  const message = await getCommunityMessage(messId);

  if (!message) {
    return <div>Message not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Community Message</h1>
      <CMEditorForm initialData={message} />
    </div>
  );
}