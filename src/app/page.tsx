'use client';

import { SectionCards } from "@/components/section-cards";
export const runtime = "edge";


export default function DashboardPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2 ml-4 mt-2.5 mr-4">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
      </div>
    </div>

  );
}

/*

Page

  Last5 Messages
    Message List Element x5
    
  Last5 Events 
    Event List Element x5

  Last5 Votes
    Vote List Element x5


*/