'use server';

import { db } from "@/db";
import { registerUser } from "@/db/registerUsers";
import { verifiedAddresses } from "@/db/schema/verifiedaddresses";
import { and, eq } from "drizzle-orm";

export async function registerUserWithAddress(payload: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}) {
  const { street, city, state, zip } = payload.address;

  const verified = await db.query.verifiedAddresses.findFirst({
    where: eq(verifiedAddresses.streetAddress, payload.address.street)
  });

  if (!verified) {
    return { error: "Address is not valid" };
  }

  const result = await registerUser(payload);
  return result;
}