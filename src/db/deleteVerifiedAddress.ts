'use server';

import { db } from '@/db';
import { verifiedAddresses } from '@/db/schema/verifiedaddresses';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function deleteVerifiedAddress(id: number) {
  await db.delete(verifiedAddresses).where(eq(verifiedAddresses.id, id));
  revalidatePath('/verified-addresses');
}