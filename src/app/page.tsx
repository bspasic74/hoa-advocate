
import { auth } from "@/auth";
import { SectionCards } from "@/components/section-cards";
export const runtime = "edge";


export default async function DashboardPage() {
  const session = await auth();
  console.log("Session in DashboardPage: ", session);

  if (!session) {
    return (
      <div className="flex flex-1 items-center justify-center landpage">
        <h1 className="text-3xl font-bold text-white fp-title-pos">Please log in to access the dashboard</h1>
      </div>
    );
  }
  
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