
export const runtime = "edge";

import { getUserById } from '@/db/db-actions-users'
import { notFound } from 'next/navigation'
import UserInfoCard from '@/components/user-info-card'

interface PageProps {
  params: Promise <{
    userId: string;
  }>;
}

export default async function UserPage({ params }: PageProps) {
  const { userId } = await params;
  const user = await getUserById(userId);

  if (!user) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <UserInfoCard userData={user} />
    </div>
  )
}