'use client';

import { AdminPanel } from "@/components/admin-sc";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function AdminPage() {
  const session = useSession();
  if(!session || !session.data?.user.isAdmin){
    redirect("/");
    return null; // This line is unreachable but TypeScript requires a return statement
  }
  
  return (
    <div className="@container/main flex flex-1 flex-col gap-2 ml-4 mt-2.5 mr-4">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <AdminPanel />
      </div>
    </div>

  );
}