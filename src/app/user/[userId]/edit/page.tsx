
export const runtime = "edge";

import { updateUser, getUserById } from "@/db/db-actions-users";
import { EditUserForm } from "@/components/user-editor"; // Ovde promeni ime, da se ne sudara sa funkcijom!

interface EditPageProps {
  params: Promise<{ userId: string }>;
}

export default async function EditUserPage({ params }: EditPageProps) {
  const { userId } = await params;

  const user = await getUserById(userId);
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-4xl space-y-6 rounded-lg bg-[#e9e9e9] p-6 shadow-md">
        <h2 className="text-xl font-semibold text-center">Edit user</h2>
        <EditUserForm
          userId={userId}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          phone={user.phone}
          isAdmin={user.isAdmin}
        />
      </div>
    </div>
  );
}
