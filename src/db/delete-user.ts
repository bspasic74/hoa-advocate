"use server";

import { deleteUser } from "@/db/db-actions-users";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteUserAction(formData: FormData) {
  const id = formData.get('userId') as string;
  if (!id) throw new Error("User ID missing");

  await deleteUser(id);
  revalidatePath("/user");
  redirect("/user");
}