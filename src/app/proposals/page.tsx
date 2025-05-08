export const runtime = "edge";

import { getAllProposals } from "@/db/db-actions-proposals";
import MainProposalsPageClient from "@/components/mainProposalsPage";

export default async function ProposalsPage() {
  const allProposals = (await getAllProposals())?.map(proposal => ({
    ...proposal,
    id: proposal.id.toString(),
  }));

  return (
    <MainProposalsPageClient proposals={allProposals ?? []} />
  );
}