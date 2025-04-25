export const runtime = "edge";

import { auth } from '@/auth';
import Link from "next/link";
import { getAllUsers } from '@/db/db-actions-users';
import {
  Card,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <h1 className="text-2xl font-bold">Users List</h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {users.map((user: any) => (
          <Link href={`/user/${user.id}`} key={user.id}>
            <Card className="p-4 mb-2" style={{ cursor: 'pointer' }}>
              <CardTitle className="text-sm text-muted-foreground">{user.firstName} {user.lastName}</CardTitle>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}