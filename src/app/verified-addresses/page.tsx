export const runtime = "edge";


import { db } from '@/db';
import { verifiedAddresses } from '@/db/schema/verifiedaddresses';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

export default async function VerifiedAddressesPage() {
  const addresses = await db.select().from(verifiedAddresses);

  return (
    <div className="w-full mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Verified Addresses</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Street Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Zip Code</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {addresses.map((address) => (
            <TableRow key={address.id}>
              <TableCell>{address.streetAddress}</TableCell>
              <TableCell>{address.city}</TableCell>
              <TableCell>{address.state}</TableCell>
              <TableCell>{address.zipCode}</TableCell>
              <TableCell>
                {/* Ovo dugme biće povezano sa server akcijom kasnije */}
                <form action={`/api/delete-address/${address.id}`} method="POST">
                  <Button type="submit" variant="destructive">Delete</Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-8">
        <Link href="/verified-addresses/new">
          <Button className="button-dark-blue text-white">Add New Address</Button>
        </Link>
      </div>
    </div>
  );
}