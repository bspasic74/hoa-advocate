export const runtime = 'edge';

import { voteForProposal } from '@/db/db-actions-proposals';
import ReadOnlyEditor from '@/components/wyswyg-editor/readonly-editor-component';
import { getProposalById } from '@/db/db-actions-proposals';
import { notFound } from 'next/navigation';
import React from 'react';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteProposal } from "@/db/db-actions-proposals";
import { DeleteContentButton } from '@/components/DeleteContentButton';
import Link from "next/link";
import { auth } from '@/auth';
import VoteForm from '@/components/vote-form';
import VoteResults from '@/components/VoteResults';
import { getUsersWithAddressAndVote } from '@/db/db-actions-uservote';
import { getUserVoteForProposal } from '@/db/db-actions-uservote';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserWithVote {
  id: string;
  firstName: string | null;
  lastName: string | null;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
  } | null;
  voteValue: boolean | null;
}

interface PageProps {
  params: Promise<{
    proposalId: string;
  }>;
}

export default async function ProposalPage({ params }: PageProps) {
  const resolvedParams = await params;
  const session = await auth();
  const proposalId = parseInt(resolvedParams.proposalId, 10);

  const isAdmin = session?.user?.isAdmin || false;

  if (isNaN(proposalId)) {
    notFound();
  }

  const proposal = await getProposalById(proposalId);
  if (!proposal) {
    notFound();
  }

  async function handleDelete() {
    "use server";
    await deleteProposal(proposalId);
    redirect("/proposals");
  }

  let usersWithVotes: UserWithVote[] = [];
  if (proposal.status === "finished" && isAdmin) {
    usersWithVotes = await getUsersWithAddressAndVote(proposalId.toString());
  }

  let userHasVoted = false;
  if (proposal.status === "active" && session?.user?.id) {
    const userVote = await getUserVoteForProposal(session.user.id, proposalId);
    userHasVoted = !!userVote;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{proposal.title}</h1>
          <p className="text-gray-500 text-xl pt-10 mb-2">
            Start voting: {proposal.startdate.toLocaleDateString()}
          </p>
          <p className="text-gray-500 text-xl mb-4">
            End voting: {proposal.enddate.toLocaleDateString()}
          </p>

          {/* Vote Results */}
          {(proposal.status === "finished" || userHasVoted) && (
            <div className="mb-6">
              <VoteResults
                yesVotes={proposal.votesYesCount ?? 0}
                totalVotes={proposal.votesCount ?? 0}
              />
            </div>
          )}

          {/* Description */}
          <div className="prose prose-lg pb-6">
            {proposal.description ? (
              <ReadOnlyEditor content={proposal.description} />
            ) : (
              <p className="text-gray-400 italic">
                {proposal.shortdescription}
              </p>
            )}
          </div>

          {/* Status-based Content */}
          {proposal.status === "pending" ? (
            <p className="text-gray-500 text-xl pt-10 mb-2">
              Voting is starting on: {proposal.startdate.toLocaleDateString()}
            </p>
          ) : proposal.status === "canceled" ? (
            <p className="text-red-500 text-xl pt-10 mb-2">
              Voting is canceled
            </p>
          ) : proposal.status === "active" && !userHasVoted ? (
            <VoteForm proposalId={proposalId} />
          ) : proposal.status === "active" && userHasVoted ? (
            <p className="text-green-600 text-xl pt-10 mb-2 font-semibold">
              Already voted for this proposal
            </p>
          ) : null}

          {/* Admin Actions */}
          {isAdmin && (
            <div className="flex gap-4 pt-6">
              <Link href={`/proposals/${proposalId}/edit`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Edit
                </button>
              </Link>
              <form action={handleDelete}>
                <DeleteContentButton />
              </form>
            </div>
          )}
        </div>

        {/* Right Column - Only for admins */}
        {isAdmin && proposal.status === "finished" && (
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">User Votes</h2>
            <p className="text-sm text-gray-500 mb-4">
              This information is only visible to administrators.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Vote</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersWithVotes.map((user, index) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-gray-100 transition"
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <Link
                        href={`/user/${user.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {user.firstName ?? "-"}
                      </Link>
                    </TableCell>
                    <TableCell>{user.lastName ?? "-"}</TableCell>
                    <TableCell>
                      {user.address
                        ? `${user.address.streetAddress}, ${user.address.city}, ${user.address.state} ${user.address.zipCode}`
                        : "No Address"}
                    </TableCell>
                    <TableCell>
                      {user.voteValue === true ? (
                        <span className="text-green-600 font-semibold">
                          Yes
                        </span>
                      ) : user.voteValue === false ? (
                        <span className="text-red-600 font-semibold">No</span>
                      ) : (
                        <span className="text-gray-500 italic">Not Voted</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
