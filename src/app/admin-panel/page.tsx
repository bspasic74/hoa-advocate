'use client';

import { AdminPanel } from "@/components/admin-sc";


export default function AdminPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2 ml-4 mt-2.5 mr-4">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <AdminPanel />
      </div>
    </div>

  );
}