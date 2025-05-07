'use server';

import { db } from "@/db";
import { registerUser } from "@/db/registerUsers";
import { verifiedAddresses } from "@/db/schema/verifiedaddresses";
import { and, eq } from "drizzle-orm";

interface AddressPayload {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface UserRegistrationPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  address: AddressPayload;
  validateOnly?: boolean;
}

export async function registerUserWithAddress(payload: UserRegistrationPayload) {
  const { street, city, state, zip } = payload.address;

  const verified = await db.query.verifiedAddresses.findFirst({
    where: (
      eq(verifiedAddresses.streetAddress, street)
    )
  });

  const invalidComponents: string[] = [];
  if (!verified) {
    invalidComponents.push("Street");
  } else {

    if (verified.city != city){
      invalidComponents.push("City");
    }
    if (verified.state != state){
      invalidComponents.push("State");
    }
    if (verified.zipCode != zip){
      invalidComponents.push("Zip");
    }
  }
  
  if (invalidComponents.length > 0){
    const errorMessage = `Invalid address components: ${invalidComponents.join(", ")}`;
    return { error: errorMessage };
  }

  if (payload.validateOnly) {
    return { success: true, message: "Address validation successful" };
  }

  const result = await registerUser(payload);
  return result;
}