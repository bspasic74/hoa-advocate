"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getCommunityMessages } from '@/db/db-actions-cm';

export default function MainCommunityMessagePageClient({ messages }: { messages: any[] }) {
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const pageCount = Math.ceil(messages.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = messages.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                    <h1 className="font-bold big-title-class">Community Messages</h1>
                </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
                {currentItems.map((message, index) => (
                    <Card key={message.id} className="flex flex-col justify-between fp-card-bg animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                        <CardHeader>
                            <CardTitle className='card-title-class'>{message.title}</CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardContent className="grid gap-4">
                            <CardDescription className='card-text'>{message.shortdescription}</CardDescription>
                        </CardContent>
                        <Separator />
                        <CardFooter>
                            <Link href={`/community-messages/${message.id}`}>
                                <Button variant="outline" className='button-dark-blue mx-auto'>View Message</Button>
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
