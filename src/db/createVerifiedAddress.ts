"use server";

import { db } from "../db";
import { verifiedAddresses } from "@/db/schema/verifiedaddresses";
import { revalidatePath } from "next/cache";

export async function createVerifiedAddress(formData: FormData) {
  const streetAddress = formData.get("streetAddress") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const zipCode = formData.get("zipCode") as string;

  if (!streetAddress || !city || !state || !zipCode) {
    throw new Error("All fields are required.");
  }

  await db.insert(verifiedAddresses).values({
    streetAddress,
    city,
    state,
    zipCode,
  });

  revalidatePath("/verified-addresses");
}
