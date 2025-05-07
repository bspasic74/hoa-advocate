'use client';

import Image from "next/image";
import { registerUser } from "@/db/registerUsers";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import { registerUserWithAddress } from "@/db/registerUserWithAddress";
import { useState } from "react";




export function RegisterForm() {
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    const phone = data.get("phone") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirmPassword") as string;

    const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;


    if (!phoneRegex.test(phone)) {
      setError("Phone number format is invalid. Expected format: 123-456-7890 or similar.");
      return;
    }


    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }


    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const payload = {
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      email: data.get("email") as string,
      phone,
      password,
      address: {
        street: data.get("address") as string,
        city: data.get("city") as string,
        state: data.get("state") as string,
        zip: data.get("zip") as string,
      },
    };

    try {
      const result = await registerUserWithAddress(payload);
      update();

      if (result?.error) {
        console.log("Error registering user:", result.error);
        setError("Error registering user: " + (result.error as string));
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Unexpected error occurred during registration.");
    }
  }
  return (
    <Card className="overflow-hidden rounded-2xl shadow-lg p-0">
      <CardContent className="grid grid-cols-1 p-0 lg:grid-cols-2">
        {/* Left side - Form */}
        <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
          <div>
            <h2 className="text-2xl font-bold">Create an Account</h2>
            <p className="text-sm text-gray-600">Enter your details to register</p>
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* The form now has the submit handler */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 pb-4 gap-4">
              <div>
                <Label className="pb-2" htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" type="text" placeholder="John" required />
              </div>
              <div>
                <Label className="pb-2" htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" type="text" placeholder="Doe" required />
              </div>
            </div>

            <div className="pb-4">
              <Label className="pb-2" htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>

            <div className="pb-4">
              <Label className="pb-2" htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" placeholder="123-456-7890" required />
            </div>

            <div className="pb-4">
              <Label className="pb-2" htmlFor="address">Address</Label>
              <Input id="address" name="address" type="text" placeholder="Example Street/12-34" required />
            </div>

            {/* New Fields: City, State, Zip */}
            <div className="grid grid-cols-2 gap-4 pb-4">
              <div>
                <Label className="pb-2" htmlFor="city">City</Label>
                <Input id="city" name="city" type="text" placeholder="New York" required />
              </div>
              <div>
                <Label className="pb-2" htmlFor="zip">Zip Code</Label>
                <Input id="zip" name="zip" type="text" placeholder="10001" required />
              </div>
            </div>
            <div className="pb-4">
              <Label className="pb-2" htmlFor="state">State</Label>
              <select
                id="state"
                name="state"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Select a state</option>
                {[
                  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
                  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
                  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
                  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
                  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
                ].map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="pb-4">
              <Label className="pb-2" htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Password must be at least 8 characters long." required />
            </div>

            <div className="pb-4">
              <Label className="pb-2" htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="********" required />
            </div>

            <Button type="submit" className="bg-black text-white rounded-md px-4 py-1 text-sm">
              Register
            </Button>
          </form>
        </div>

        {/* Right side - Image */}
        <div className="relative hidden lg:block h-full">
          <Image
            src="/reg-placeholder-1.jpg"
            alt="Register"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardContent>
    </Card>
  );
}