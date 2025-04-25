'use client'

import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'

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
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">User Information</h2>
      <Separator className="mb-4" />
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>First Name:</strong> {userData.firstName}</p>
      <p><strong>Last Name:</strong> {userData.lastName}</p>
      <p><strong>Phone:</strong> {userData.phone || '-'}</p>
      <p><strong>Street Address:</strong> {userData.address?.streetAddress || '-'}</p>
      <p><strong>Admin:</strong> {userData.isAdmin ? 'Yes' : 'No'}</p>
    </Card>
  )
}