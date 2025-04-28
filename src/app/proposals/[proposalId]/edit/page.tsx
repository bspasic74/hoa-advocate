export const runtime = 'edge';

import { getProposalById } from "@/db/db-actions-proposals";
import { ProposalEditorForm } from "@/components/proposal-editor-form";

interface EditPageProps {
  params: Promise<{ proposalId: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
    // Await the promise to get the resolved value
    const resolvedParams = await params;
    const propId = parseInt(resolvedParams.proposalId, 10);
  
  // Handle potential parsing errors
  if (isNaN(propId)) {
    return <div>Invalid proposal ID</div>;
  }
  
  const proposal = await getProposalById(propId);

  if (!proposal) {
    return <div>Proposal not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Proposal</h1>
      <ProposalEditorForm proposalId={propId} />
    </div>
  );
}