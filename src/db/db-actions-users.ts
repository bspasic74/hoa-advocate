'use server';

import { db } from '../db';
import { users } from '@/db/schema/users'
import { eq } from 'drizzle-orm'

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

export async function getAllUsers() {
  const allusers= await db
    .select()
    .from(users);

  return allusers || null
}