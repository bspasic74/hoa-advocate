'use server';

import { db } from '../db';
import { users } from '@/db/schema/users'
import { addresses } from '@/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getUserByEmail(email: string) {

  const result1 = await db.query.users.findFirst({
    where: eq(users.email, email),
    with: {
      address: true,
    },
  });

  return result1 || null
}

export async function getUserById(id: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      address: true,
    },
  });

  return user;
}

/*export async function getAllUsers() {
  const allusers= await db
    .select()
    .from(users);

  return allusers || null
}*/
export async function getAllUsers() {
  const result = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      address: {
        streetAddress: addresses.streetAddress,
        city: addresses.city,
        state: addresses.state,
        zipCode: addresses.zipCode,
      },
    })
    .from(users)
    .leftJoin(addresses, eq(addresses.id, users.addressId)); // povezivanje
  return result;
}

export async function updateUser(
  id: string, 
  updatedData: Partial<typeof users.$inferInsert>, 
  updatedAddress: Partial<typeof addresses.$inferInsert>
) {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, id),
    with: { address: true },
  });

  if (!existingUser) {
    throw new Error("User not found.");
  }

  const addressChanged =
    existingUser.address?.streetAddress !== updatedAddress.streetAddress ||
    existingUser.address?.city !== updatedAddress.city ||
    existingUser.address?.state !== updatedAddress.state ||
    existingUser.address?.zipCode !== updatedAddress.zipCode;

  if (addressChanged) {
    // Check if the address already exists in the database
    const existingAddress = await db.query.addresses.findFirst({
      where: and(
        eq(addresses.streetAddress, updatedAddress.streetAddress!),
        eq(addresses.city, updatedAddress.city!),
        eq(addresses.state, updatedAddress.state!),
        eq(addresses.zipCode, updatedAddress.zipCode!)
      )
    });

    if (existingAddress) {
      // If address already exists, just update the user's addressId
      updatedData.addressId = String(existingAddress.id);
    } else if (existingUser.address) {
      // If user has an address but it's different and doesn't exist in DB, update it
      await db
        .update(addresses)
        .set({
          streetAddress: updatedAddress.streetAddress!,
          city: updatedAddress.city!,
          state: updatedAddress.state!,
          zipCode: updatedAddress.zipCode!,
          modifiedAt: new Date(),
        })
        .where(eq(addresses.id, existingUser.address.id));
    } else {
      // If user has no address and the new one doesn't exist, create it
      const insertedAddress = await db
        .insert(addresses)
        .values({
          streetAddress: updatedAddress.streetAddress!,
          city: updatedAddress.city!,
          state: updatedAddress.state!,
          zipCode: updatedAddress.zipCode!,
        })
        .returning();

      const addressId = String(insertedAddress[0].id);
      updatedData.addressId = addressId;
    }
  }

  const updatedUser = await db
    .update(users)
    .set(updatedData)
    .where(eq(users.id, id))
    .returning();

  return updatedUser[0];
}


export async function deleteUser(id: string) {
  try {
    // Obriši korisnika po id-ju
    const result = await db.delete(users)
      .where(eq(users.id, id))
      .returning();
    
    if (!result.length) {
      return { 
        success: false, 
        error: 'User not found' 
      }
    }

    // Revalidate da se osveže stranice (ako trebaš)
    revalidatePath('/user');
    revalidatePath(`/user/${id}`);

    return { 
      success: true, 
      deletedUser: result[0] 
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return { 
      success: false, 
      error: 'Failed to delete user' 
    }
  }
}

