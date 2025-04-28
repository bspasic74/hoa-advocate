

export const runtime = 'edge';

import { voteForProposal } from '@/db/db-actions-proposals'; 
import ReadOnlyEditor from '@/components/wyswyg-editor/readonly-editor-component';
import { getProposalById } from '@/db/db-actions-proposals'; 
import { notFound } from 'next/navigation';
import React from 'react';
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
import { deleteProposal } from "@/db/db-actions-proposals";
import { DeleteContentButton } from '@/components/DeleteContentButton';
import Link from "next/link";
import { auth } from '@/auth';
import toast from 'react-hot-toast'; 
import VoteForm from '@/components/vote-form';
import VoteResults from '@/components/VoteResults'; 

interface PageProps {
  params: Promise<{
    proposalId: string;
  }>;
}

export default async function ProposalPage({ params }: PageProps) {
  // Await the promise to get the resolved value
  const resolvedParams = await params;
  const session = await auth();
  const proposalId = parseInt(resolvedParams.proposalId, 10);

  if (isNaN(proposalId)) {
    notFound();
  }

  const proposal = await getProposalById(proposalId);

  if (!proposal) {
    notFound(); // shows 404 page
  }

  async function handleDelete() {
    "use server";
    await deleteProposal(proposalId);
    redirect("/proposals"); 
  }


  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{proposal.title}</h1>
      <p className="text-gray-500 text-sm mb-2">Start voting: {proposal.startdate.toLocaleDateString()}</p>
      <p className="text-gray-500 text-sm mb-2">End voting: {proposal.enddate.toLocaleDateString()}</p>
      <div className="prose prose-lg">
        {proposal.description ? (<>
          <ReadOnlyEditor content={proposal.description} />
          </>
        ) : (
          <p className="text-gray-400 italic">{proposal.shortdescription}</p>
        )}
      </div>

{/* Voting section */}
{proposal.status === "finished" ? (
  <VoteResults yesVotes={proposal.votesYesCount ?? 0} totalVotes={proposal.votesCount ?? 0} />
) : (
  <VoteForm proposalId={proposalId} />
)}

{/* Voting or Results based on proposal status */}
{/*{proposal.status === 'active' ? (
  <VoteForm proposalId={proposalId} />
) : proposal.status === 'finished' ? (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-4">Voting Results</h2>
    <div className="flex gap-4">
      <div className="bg-green-100 text-green-800 px-4 py-2 rounded">
        Yes votes: {proposal.votesYesCount ?? 0}
      </div>
      <div className="bg-red-100 text-red-800 px-4 py-2 rounded">
        No votes: {(proposal.votesCount ?? 0) - (proposal.votesYesCount ?? 0)}
      </div>
      <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded">
        Total votes: {proposal.votesCount ?? 0}
      </div>
    </div>
  </div>
) : null}*/}
    </div>
  );
}