"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { updateUser, getUserById } from "@/db/db-actions-users";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { registerUserWithAddress } from "@/db/registerUserWithAddress";

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
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
  phone?: string | null;
  isAdmin?: boolean | null;
}

export function EditUserForm({ userId }: EditUserFormProps) {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [addressError, setAddressError] = useState("");
  const { update } = useSession();

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

  function validatePhone(phone: string): boolean {
    return /^[0-9\s\-\+\(\)]{6,}$/.test(phone);
  }

  function validateZip(zip: string): boolean {
    return /^\d{5}$/.test(zip);
  }

  async function validateAddress(address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  }): Promise<boolean> {
    try {
      // Check if the address is valid by calling registerUserWithAddress
      // with a validation flag (doesn't create a new user, just validates the address)
      const validationResult = await registerUserWithAddress({
        firstName: "Validation",
        lastName: "Validation",
        email: "validation@example.com",
        phone: "0000000000",
        address: {
          street: address.street,
          city: address.city,
          state: address.state,
          zip: address.zip,
        },
        password: "dummyPassword",
        validateOnly: true,
      });

      if (validationResult?.error) {
        setAddressError(validationResult.error as string);
        return false;
      }
      
      return true;
    } catch (err) {
      console.error("Address validation error:", err);
      setAddressError("Failed to validate address");
      return false;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userData) return;

    setError("");
    setAddressError("");
    
    const phone = userData.phone;
    const zipValid = validateZip(userData.address?.zipCode || "");
    const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    
    if (!phoneRegex.test(phone || "")) {
      setError("Phone number format is invalid. Expected format: 123-456-7890 or similar.");
      return;
    }

    if (!zipValid) {
      setError("Zip code must be 5 digits.");
      return;
    }

    if (password && password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Prepare address data for validation
    const addressData = {
      street: userData.address?.streetAddress || "",
      city: userData.address?.city || "",
      state: userData.address?.state || "",
      zip: userData.address?.zipCode || ""
    };

    // Validate address against allowed list
    const isAddressValid = await validateAddress(addressData);
    if (!isAddressValid) {
      // Address validation error is already set by validateAddress function
      return;
    }

    setLoading(true);

    const updateData = { ...userData };
    if (!password) {
      // Signal that password should not be updated
      (updateData as any).skipPasswordUpdate = true;
    } else {
      (updateData as any).password = password;
    }

    try {
      await updateUser(userId, updateData, userData.address || {});
      update(); // Update session if needed
      setLoading(false);
      router.push(`/user/${userId}`);
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to update user information");
      setLoading(false);
    }
  }

  if (!userData) return <div>Loading...</div>;

  return (
    <form className="form-container space-y-6" onSubmit={handleSubmit}>
      {/* First and Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">First Name</label>
          <Input 
            className="bg-[#f4f4fc]"
            name="firstName"
            value={userData.firstName || ""}
            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Last Name</label>
          <Input 
            className="bg-[#f4f4fc]"
            name="lastName"
            value={userData.lastName || ""}
            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
          />
        </div>
      </div>

      {/* Email and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <Input 
            className="bg-[#f4f4fc]"
            name="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Phone</label>
          <Input 
            className="bg-[#f4f4fc]"
            name="phone"
            value={userData.phone || ""}
            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
          />
        </div>
      </div>

      {/* Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Street Address</label>
          <Input 
            className="bg-[#f4f4fc]"
            name="address"
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
          <label className="block mb-1 text-sm font-medium">City</label>
          <Input 
            className="bg-[#f4f4fc]"
            name="city"
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
          <label className="block mb-1 text-sm font-medium">State</label>
          <select 
            className="bg-[#f4f4fc] w-full border rounded p-2"
            name="state"
            value={userData.address?.state || ""}
            onChange={(e) =>
              setUserData({
                ...userData,
                address: { ...userData.address!, state: e.target.value },
              })
            }
          >
            <option value="">Select a state</option>
            {[
              "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
              "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
              "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
              "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
              "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
            ].map((stateCode) => (
              <option key={stateCode} value={stateCode}>
                {stateCode}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Zip Code</label>
          <Input 
            className="bg-[#f4f4fc]"
            name="zip"
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

      {/* Address Error Message */}
      {addressError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600">
          <p className="text-sm">Address error: {addressError}</p>
          <p className="text-xs mt-1">Please enter a valid address from the allowed list.</p>
        </div>
      )}

      {/* Password Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">New Password</label>
          <Input 
            className="bg-[#f4f4fc]"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Confirm Password</label>
          <Input 
            className="bg-[#f4f4fc]"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-center pt-6">
        <Button disabled={loading} type="submit" className="button-dark-blue text-white">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}