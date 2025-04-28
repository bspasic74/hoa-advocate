"use client";

import { useTransition } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { deleteUserAction } from "@/db/delete-user"; // uvoziš server action

export default function DeleteUserForm({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();

  function confirmDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Are you sure you want to delete this user?</p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => toast.dismiss(t.id)}>No</Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              toast.dismiss(t.id);
              const form = event.target as HTMLFormElement;
              startTransition(() => form.requestSubmit());
            }}
          >
            Yes, Delete
          </Button>
        </div>
      </div>
    ), {
      duration: Infinity,
    });
  }

  return (
    <form action={deleteUserAction} onSubmit={confirmDelete} className="inline">
      <input type="hidden" name="userId" value={userId} />
      <Button variant="destructive" size="sm" type="submit" disabled={isPending}>
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
}