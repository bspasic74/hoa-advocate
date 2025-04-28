export const runtime = "edge";

import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { getAllProposals } from "@/db/db-actions-proposals";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProposalsPage() {
  const proposals = await getAllProposals();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {proposals?.map((proposal: any) => (
        <Card key={proposal.id} className="flex flex-col justify-between">
          <CardHeader className="space-y-2">
            <CardTitle>{proposal.title}</CardTitle>

            <div className="flex flex-col text-sm text-muted-foreground gap-2">
              {/* Start and End voting in same row */}
              <div className="flex items-center justify-between">
                <div>
                  
                  Start voting:{proposal.startdate.toLocaleDateString()}
                </div>
                <div>
                  
                  End voting: {proposal.enddate.toLocaleDateString()}
                </div>
              </div>

              {/* Status under dates */}
              <div>
                Status:{proposal.status}
              </div>
            </div>
          </CardHeader>

          <div className="px-6 pb-2 text-sm text-muted-foreground">
            {proposal.shortdescription || "No description"}
          </div>

          <CardFooter>
            <Link href={`/proposals/${proposal.id}`}>
              <Button variant="outline">View Proposal</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}