"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-lg p-0">
      <CardContent className="grid grid-cols-1 p-0 md:grid-cols-2">
        {/* Left side - Form */}
        <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
          <div>
            <h2 className="text-2xl font-bold">Create an Account</h2>
            <p className="text-sm text-gray-600">Enter your details to register</p>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" type="text" placeholder="John" required />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" type="text" placeholder="Doe" required />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" required />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="********" required />
            </div>

            <Button type="submit" className="bg-black text-white rounded-md px-4 py-1 text-sm">
              Register
            </Button>
          </form>
        </div>

        {/* Right side - Image */}
        <div className="relative hidden h-full md:block">
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