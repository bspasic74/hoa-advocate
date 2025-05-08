export const runtime = "edge";
import { auth } from '@/auth';
import Link from "next/link";
import { getCommunityMessages } from '@/db/db-actions-cm';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { useState } from "react";

export default async function MainCommunityMessagePage({ searchParams }: { searchParams?: { page?: string } }) {
  const messages = await getCommunityMessages();
  
  // Pagination logic
  const pageSize = 6;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const totalPages = Math.ceil(messages.length / pageSize);
  
  // Get messages for current page
  const paginatedMessages = messages.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <h1 className="font-bold big-title-class">Community Messages</h1>
        </div>
      </div>
      
      <div className="grid gap-4 xl:grid-cols-3">
        {paginatedMessages.map((message, index) => (
          <Card key={message.id} className="flex flex-col justify-between fp-card-bg animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader>
              <CardTitle className='card-title-class'>{message.title}</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="grid gap-4">
              <div>
                <CardDescription className='card-text'>{message.shortdescription}</CardDescription>
              </div>
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
      
      {/* Pagination Component */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={`/community-messages?page=${page - 1}`} />
                </PaginationItem>
              )}
              
              {/* First page */}
              {page > 2 && (
                <PaginationItem>
                  <PaginationLink href="/community-messages?page=1">1</PaginationLink>
                </PaginationItem>
              )}
              
              {/* Ellipsis for many pages */}
              {page > 3 && (
                <PaginationItem>
                  <PaginationLink className="disabled-link">...</PaginationLink>
                </PaginationItem>
              )}
              
              {/* Previous page (if not first) */}
              {page > 1 && (
                <PaginationItem>
                  <PaginationLink href={`/community-messages?page=${page - 1}`}>{page - 1}</PaginationLink>
                </PaginationItem>
              )}
              
              {/* Current page */}
              <PaginationItem>
                <PaginationLink href={`/community-messages?page=${page}`} isActive>{page}</PaginationLink>
              </PaginationItem>
              
              {/* Next page (if not last) */}
              {page < totalPages && (
                <PaginationItem>
                  <PaginationLink href={`/community-messages?page=${page + 1}`}>{page + 1}</PaginationLink>
                </PaginationItem>
              )}
              
              {/* Ellipsis for many pages */}
              {page < totalPages - 2 && (
                <PaginationItem>
                  <span className="disabled-link">...</span>
                </PaginationItem>
              )}
              
              {/* Last page */}
              {page < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink href={`/community-messages?page=${totalPages}`}>{totalPages}</PaginationLink>
                </PaginationItem>
              )}
              
              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext href={`/community-messages?page=${page + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}