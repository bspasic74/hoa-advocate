'use client'

import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from "next/link";

interface UserData {
  id: string;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  emailVerified: Date | null;
  passwordHash: string;
  phone: string | null;
  image: string | null;
  addressId: string | null;
  isAdmin: boolean | null;
  createdAt: Date | null;
  address?: {
    id: number;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    createdAt: Date | null;
    modifiedAt: Date | null;
  } | null;
}

export default function UserInfoCard({ userData }: { userData: UserData }) {
  return (
    <Card className="p-6 fp-card-bg">
      <h2 className="text-xl font-semibold mb-4">User Information</h2>
      <Separator className="mb-6" />

      {/* First and Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-l font-medium text-gray-700 mb-1">First Name</label>
          <p>{userData.firstName || '-'}</p>
        </div>
        <div>
          <label className="block text-l font-medium text-gray-700 mb-1">Last Name</label>
          <p>{userData.lastName || '-'}</p>
        </div>
      </div>

      {/* Email and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-l font-medium text-gray-700 mb-1">Email</label>
          <p>{userData.email}</p>
        </div>
        <div>
          <label className="block text-l font-medium text-gray-700 mb-1">Phone</label>
          <p>{userData.phone || '-'}</p>
        </div>
      </div>

      {/* Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-l font-medium text-gray-700 mb-1">Street Address</label>
          <p>{userData.address?.streetAddress || '-'}</p>
        </div>
        <div>
          <label className="block text-l font-medium text-gray-700 mb-1">City</label>
          <p>{userData.address?.city || '-'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <p>{userData.address?.state || '-'}</p>
        </div>
        <div>
          <label className="block text-l font-medium text-gray-700 mb-1">Zip Code</label>
          <p>{userData.address?.zipCode || '-'}</p>
        </div>
      </div>

      {/* Admin */}
      <div className="mb-6">
        <label className="block text-l font-medium text-gray-700 mb-1">Admin</label>
        <p>{userData.isAdmin ? 'Yes' : 'No'}</p>
      </div>

      {/* Edit Button */}
      <div className="flex justify-center">
      <Link href={`/user/${userData.id}/edit`}>
        <Button className="button-dark-blue mx-auto text-white px-4 py-2 rounded">Edit User</Button>
      </Link>
      </div>
    </Card>
  )
}