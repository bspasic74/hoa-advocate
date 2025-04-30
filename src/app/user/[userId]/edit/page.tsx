
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
    <div className="p-4">
      <EditUserForm 
        userId={userId} 
        firstName={user.firstName} 
        lastName={user.lastName} 
        email={user.email} 
        phone={user.phone} 
        isAdmin={user.isAdmin} 
      />
    </div>
  );
}
