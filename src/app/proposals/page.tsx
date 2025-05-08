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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

export default async function ProposalsPage({ searchParams }: { searchParams: { page?: string } }) {
  const proposals = await getAllProposals();
  
  // Pagination logic
  const pageSize = 6;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const totalPages = Math.ceil((proposals?.length ?? 0) / pageSize);
  
  // Get proposals for current page
  const paginatedProposals = proposals?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <h1 className="font-bold big-title-class">Proposals</h1>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {paginatedProposals?.map((proposal: any, index) => (
          <Card key={proposal.id} className="flex flex-col justify-between fp-card-bg animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
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
                  Status: {proposal.status}
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

      {/* Pagination Component */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={`/proposals?page=${page - 1}`} />
                </PaginationItem>
              )}
              
              {/* First page */}
              {page > 2 && (
                <PaginationItem>
                  <PaginationLink href="/proposals?page=1">1</PaginationLink>
                </PaginationItem>
              )}
              
              {/* Ellipsis for many pages */}
              {page > 3 && (
                <PaginationItem>
                  <span className="pagination-ellipsis">...</span>
                </PaginationItem>
              )}
              
              {/* Previous page (if not first) */}
              {page > 1 && (
                <PaginationItem>
                  <PaginationLink href={`/proposals?page=${page - 1}`}>{page - 1}</PaginationLink>
                </PaginationItem>
              )}
              
              {/* Current page */}
              <PaginationItem>
                <PaginationLink href={`/proposals?page=${page}`} isActive>{page}</PaginationLink>
              </PaginationItem>
              
              {/* Next page (if not last) */}
              {page < totalPages && (
                <PaginationItem>
                  <PaginationLink href={`/proposals?page=${page + 1}`}>{page + 1}</PaginationLink>
                </PaginationItem>
              )}
              
              {/* Ellipsis for many pages */}
              {page < totalPages - 2 && (
                <PaginationItem>
                  <span className="pagination-ellipsis">...</span>
                </PaginationItem>
              )}
              
              {/* Last page */}
              {page < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink href={`/proposals?page=${totalPages}`}>{totalPages}</PaginationLink>
                </PaginationItem>
              )}
              
              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext href={`/proposals?page=${page + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}