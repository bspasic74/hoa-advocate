"use client";

import { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

interface Proposal {
    id: string;
    title: string;
    startdate: Date;
    enddate: Date;
    status: string;
    shortdescription?: string;
}

export default function MainProposalsPageClient({
    proposals,
}: {
    proposals: Proposal[];
}) {
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const pageCount = Math.ceil(proposals.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = proposals.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                    <h1 className="font-bold big-title-class">Proposals</h1>
                </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
                {currentItems.map((proposal, index) => (
                    <Card
                        key={proposal.id}
                        className="flex flex-col justify-between fp-card-bg animate-fadeIn"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <CardHeader className="space-y-2">
                            <CardTitle className="card-title-class">{proposal.title}</CardTitle>
                            <div className="flex flex-col text-sm text-muted-foreground gap-2">
                                <div className="flex items-center justify-between">
                                    <div>Start voting: {new Date(proposal.startdate).toLocaleDateString()}</div>
                                    <div>End voting: {new Date(proposal.enddate).toLocaleDateString()}</div>
                                </div>
                                <div>Status: {proposal.status}</div>
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
                                <Button variant="outline" className="button-dark-blue mx-auto">
                                    View Proposal
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            {pageCount > 1 && (
                <Pagination className="mt-6">
                    <PaginationContent>
                        {currentPage > 1 && (
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    className="cursor-pointer"
                                />
                            </PaginationItem>
                        )}

                        <PaginationItem className="text-sm px-4 py-2">
                            Page {currentPage} of {pageCount}
                        </PaginationItem>

                        {currentPage < pageCount && (
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                                    className="cursor-pointer"
                                />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}