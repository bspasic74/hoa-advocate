"use server";

import { db } from "@/db"; // Drizzle DB instance
import { addresses} from "@/db/schema/addresses";
import { users} from "@/db/schema/users";
import { eq, and } from "drizzle-orm";
import { sql } from "drizzle-orm";
import bcrypt from 'bcryptjs';
import { signIn } from "@/auth";

export async function registerUser(formData: {
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
  const { firstName, lastName, email, phone, password, address } = formData;

  // 1. Check if the address already exists
  const existingAddress = await db.query.addresses.findFirst({
    where: and(
      eq(addresses.streetAddress, address.street),
      eq(addresses.city, address.city),
      eq(addresses.state, address.state),
      eq(addresses.zipCode, address.zip)
    ),
  });

  let addressId: string;

  if (existingAddress) {
    addressId = existingAddress.id.toString(); // it needs to be a string because of users.addressId
  } else {
    // 2. If it doesn't exist – insert it
    const inserted = await db
      .insert(addresses)
      .values({
        streetAddress: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zip,
      })
      .returning({ id: addresses.id });

    addressId = inserted[0].id.toString();
  }

  // 3. Hash the password (if you're using bcrypt)
  const passwordHash = await bcrypt.hashSync(password, 10);

  // 4. Generate user ID (UUID)
  const userId = crypto.randomUUID();

  // 5. Insert the user
  await db.insert(users).values({
    id: userId,
    firstName,
    lastName,
    email,
    phone,
    passwordHash,
    addressId,
  });

  const res = await signIn("credentials", {
    email, password, redirect: false,});

  return res; // Return the signIn response
}
