
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
import { getUsersWithAddressAndVote, getUserVoteForProposal } from '@/db/db-actions-uservote'; 
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

  let usersWithVotes: UserWithVote[] = [];

  if (proposal.status === "finished") {
    usersWithVotes = await getUsersWithAddressAndVote(proposalId.toString()); 
  }

  let userHasVoted = false;

  if (proposal.status === "active" && session?.user?.id) {
    const userVote = await getUserVoteForProposal(session.user.id, proposalId);
    userHasVoted = !!userVote;
  }

  return (
    <div className="max-w-max px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{proposal.title}</h1>
      <p className="text-gray-500 text-xl pt-10 mb-2">Start voting: {proposal.startdate.toLocaleDateString()}</p>
      <p className="text-gray-500 text-xl pb-10 mb-2">End voting: {proposal.enddate.toLocaleDateString()}</p>
      <div className="prose prose-lg pt-5 pb-5">
        {proposal.description ? (<>
          <ReadOnlyEditor content={proposal.description} />
          </>
        ) : (
          <p className="text-gray-400 italic">{proposal.shortdescription}</p>
        )}
      </div>

      {/* Voting section */}
      {proposal.status === "finished" ? (<>
        <VoteResults yesVotes={proposal.votesYesCount ?? 0} totalVotes={proposal.votesCount ?? 0} />
        <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">User Votes</h2>
    
        <Table>
          <TableCaption>A list of users and their votes.</TableCaption>
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
            {usersWithVotes.map((user: UserWithVote, index: number) => (
              <TableRow key={user.id} className="hover:bg-gray-100 transition">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <Link href={`/user/${user.id}`} className="text-blue-600 hover:underline">
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
                    <span className="text-green-600 font-semibold">Yes</span>
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
    </>
      ) : proposal.status === "pending" ? (
        <p className="text-gray-500 text-xl pt-10 mb-2">Voting is starting on: {proposal.startdate.toLocaleDateString()}</p>
      ) : userHasVoted ? (
        <p className="text-green-600 text-xl pt-10 mb-2 font-semibold">
          Already voted for this proposal
        </p>
      ) :  (
        <VoteForm proposalId={proposalId} />
      )}
          </div>
  );
}