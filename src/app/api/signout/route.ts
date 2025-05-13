import { signOut } from 'next-auth/react';

export const runtime = 'edge';

export async function GET() {
    await signOut();
}