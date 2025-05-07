export const runtime = "edge";

import { createVerifiedAddress } from "@/db/createVerifiedAddress";
import { VerifiedAddressForm } from "@/components/VerifiedAddressForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewVerifiedAddressPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-4xl space-y-6 rounded-lg bg-[#e9e9e9] p-6 shadow-md">
        <h2 className="text-xl font-semibold text-center">Add Verified Address</h2>

        <VerifiedAddressForm action={createVerifiedAddress} />

        <div className="flex justify-center mt-6">
          <Link href="/verified-addresses">
            <Button className="button-dark-blue" variant="secondary">Back to List</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}