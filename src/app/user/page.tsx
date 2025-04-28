export const runtime = "edge";

import { auth } from '@/auth';
import Link from "next/link";
import { toast } from "react-hot-toast";
import { getAllUsers, deleteUser } from '@/db/db-actions-users';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import DeleteUserForm from "@/components/deleteUserForm";

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  async function handleDelete(formData: FormData) {
    "use server";
    const userId = formData.get('userId') as string;
    if (!userId) {
      throw new Error('User ID is missing');
    }

    await deleteUser(userId);

    revalidatePath("/user"); 
    redirect("/user"); 
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Users List</h1>
          <Link href="/user/create">
            <Button variant="default">Create New User</Button>
          </Link>
        </div>
      </div>

      <Table>
        <TableCaption>A list of all registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any, index: number) => (
            <TableRow key={user.id} className="hover:bg-gray-100 transition">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <Link href={`/user/${user.id}`} className="text-blue-600 hover:underline">
                  {user.firstName}
                </Link>
              </TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.address
                  ? `${user.address.streetAddress}, ${user.address.city}, ${user.address.state} ${user.address.zipCode}`
                  : 'No Address'}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Link href={`/user/${user.id}/edit`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <DeleteUserForm userId={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
