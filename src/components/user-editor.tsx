"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { updateUser, getUserById } from "@/db/db-actions-users";
import { useRouter } from "next/navigation";

interface Address {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

interface UserData {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  address: Address | null;
  isAdmin: boolean | null;
}

interface EditUserFormProps {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  isAdmin: boolean | null;
}

export function EditUserForm({ userId }: EditUserFormProps) {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUser() {
      const user = await getUserById(userId);
      if (user) {
        setUserData({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          address: user.address || {
            streetAddress: "",
            city: "",
            state: "",
            zipCode: "",
          },
          isAdmin: user.isAdmin,
        });
      }
    }

    getUser();
  }, [userId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userData) return;
  
    setLoading(true);
    await updateUser(userId, userData, userData.address || {});
    setLoading(false);
    
    router.push(`/user/${userId}`);
  }

  if (!userData) return <div>Loading...</div>;

  return (
    <Card className="p-6 max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Edit User</h2>
      <Separator className="mb-6" />

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* First and Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">First Name</label>
            <Input
              value={userData.firstName || ""}
              onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
            <Input
              value={userData.lastName || ""}
              onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
            />
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <Input
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Phone</label>
            <Input
              value={userData.phone || ""}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            />
          </div>
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Street Address</label>
            <Input
              value={userData.address?.streetAddress || ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  address: { ...userData.address!, streetAddress: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">City</label>
            <Input
              value={userData.address?.city || ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  address: { ...userData.address!, city: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">State</label>
            <Input
              value={userData.address?.state || ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  address: { ...userData.address!, state: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Zip Code</label>
            <Input
              value={userData.address?.zipCode || ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  address: { ...userData.address!, zipCode: e.target.value },
                })
              }
            />
          </div>
        </div>

        {/* Is Admin */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Admin</label>
          <select
            value={userData.isAdmin ? "yes" : "no"}
            onChange={(e) =>
              setUserData({ ...userData, isAdmin: e.target.value === "yes" })
            }
            className="block w-full p-2 border rounded"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="flex justify-center pt-6">
          <Button disabled={loading} type="submit" className="bg-blue-500 text-white">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Card>
  );
}