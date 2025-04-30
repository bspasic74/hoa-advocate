export const runtime = "edge";

import { createVerifiedAddress } from "@/db/createVerifiedAddress";
import { VerifiedAddressForm } from "@/components/VerifiedAddressForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewVerifiedAddressPage() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
      <h2 className="text-xl font-semibold text-center">Add Verified Address</h2>

      <VerifiedAddressForm action={createVerifiedAddress} />

      <div className="mt-6">
        <Link href="/verified-addresses">
          <Button variant="secondary">Back to List</Button>
        </Link>
      </div>
    </div>
  );
}