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

  // Handle form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);


    const payload = {
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      password: data.get("password") as string,
      address: {
        street: data.get("address") as string,
        city: data.get("city") as string,
        state: data.get("state") as string,
        zip: data.get("zip") as string,
      },
    };

    // Register user with the collected data
    //const result = await registerUser(payload);
    const result = await registerUserWithAddress(payload);

    update();

    if (result?.error) {
      console.log("Error registering user:", result.error);
      setError("Error registering user: " + (result.error as string))

    } else {
      router.push("/") // adjust this to your protected route
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
            <div className="grid grid-cols-2 pb-5 gap-4">
              <div>
                <Label className="pb-2" htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" type="text" placeholder="John" required />
              </div>
              <div>
                <Label className="pb-2" htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" type="text" placeholder="Doe" required />
              </div>
            </div>

            <div className="pb-5">
              <Label className="pb-2" htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>

            <div className="pb-5">
              <Label className="pb-2" htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" placeholder="(123) 456-7890" required />
            </div>

            <div className="pb-5">
              <Label className="pb-2" htmlFor="address">Address</Label>
              <Input id="address" name="address" type="text" placeholder="Example Street/12-34" required />
            </div>

            {/* New Fields: City, State, Zip */}
            <div className="grid grid-cols-3 gap-4 pb-5">
              <div>
                <Label className="pb-2" htmlFor="city">City</Label>
                <Input id="city" name="city" type="text" placeholder="New York" required />
              </div>
              <div>
                <Label className="pb-2" htmlFor="state">State</Label>
                <Input id="state" name="state" type="text" placeholder="NY" required />
              </div>
              <div>
                <Label className="pb-2" htmlFor="zip">Zip Code</Label>
                <Input id="zip" name="zip" type="text" placeholder="10001" required />
              </div>
            </div>

            <div className="pb-5">
              <Label className="pb-5" htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="********" required />
            </div>

            <div className="pb-5">
              <Label className="pb-5" htmlFor="confirmPassword">Confirm Password</Label>
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