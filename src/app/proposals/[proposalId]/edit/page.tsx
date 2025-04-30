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
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-max space-y-6 rounded-lg bg-[#e9e9e9] p-6 shadow-md">
        <h1 className="text-xl font-semibold text-center">Edit Proposal</h1>
        <ProposalEditorForm proposalId={propId} />
      </div>
    </div>
  );
}