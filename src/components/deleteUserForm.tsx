"use client";

import { useRef, useTransition } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { deleteUserAction } from "@/db/delete-user";

export default function DeleteUserForm({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const hasConfirmed = useRef(false); // ✅ zamena za useState

  function confirmDelete(event: React.FormEvent<HTMLFormElement>) {
    if (!hasConfirmed.current) {
      event.preventDefault();

      toast((t) => (
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Are you sure you want to delete this user?</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => toast.dismiss(t.id)}>
              No
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                toast.dismiss(t.id);
                hasConfirmed.current = true; // ✅ sinhrono postavlja potvrdu
                startTransition(() => {
                  formRef.current?.requestSubmit();
                });
              }}
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      ), {
        duration: Infinity,
      });

      return;
    }

    // Ako je već potvrđeno, dozvoli submit
  }

  return (
    <form
      ref={formRef}
      action={deleteUserAction}
      onSubmit={confirmDelete}
      className="inline"
    >
      <input type="hidden" name="userId" value={userId} />
      <Button
        className="button-dark-blue"
        variant="destructive"
        size="sm"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
}