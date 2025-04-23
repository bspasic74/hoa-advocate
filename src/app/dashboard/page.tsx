
export const runtime = 'edge';

import { auth } from "@/auth"; 
import { redirect } from "next/navigation"; 

export default async function DashboardPage() {

  const session = await auth();


  if (!session) {
    redirect("/login");
  }


  return <div>Welcome, {session.user?.email}</div>;
}