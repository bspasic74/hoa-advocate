export const runtime = "edge";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { getAllProposals } from "@/db/db-actions-proposals";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default async function ProposalsPage() {
  const proposals = await getAllProposals();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <h1 className="font-bold big-title-class">Proposals</h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {proposals?.map((proposal: any) => (
          <Card key={proposal.id} className="flex flex-col justify-between fp-card-bg">
            <CardHeader className="space-y-2">
              <CardTitle className='card-title-class'>{proposal.title}</CardTitle>

              <div className="flex flex-col text-sm text-muted-foreground gap-2">
                {/* Start and End voting in same row */}
                <div className="flex items-center justify-between">
                  <div>
                    Start voting: {proposal.startdate.toLocaleDateString()}
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
            <Separator />
            <CardContent className="grid gap-4">
              <div className="px-6 pb-2 text-sm text-muted-foreground">
                {proposal.shortdescription || "No description"}
              </div>
            </CardContent>
            <Separator />
            <CardFooter>
              <Link href={`/proposals/${proposal.id}`}>
                <Button variant="outline" className='button-dark-blue mx-auto'>View Proposal</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      </div>
      );
}