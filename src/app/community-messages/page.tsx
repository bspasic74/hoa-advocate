export const runtime = "edge";

import { auth } from '@/auth';
import Link from "next/link";
import { getCommunityMessages } from '@/db/db-actions-cm';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default async function MainCommunityMessagePage() {
  const messages = await getCommunityMessages();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <h1 className="font-bold big-title-class">Community Messages</h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {messages.map((message: any) => (
          <Card key={message.id} className="flex flex-col justify-between fp-card-bg">
            <CardHeader>
              <CardTitle className='card-title-class'>{message.title}</CardTitle>             
            </CardHeader>
            <Separator />
            <CardContent className="grid gap-4">
              <div>
              <CardDescription className='card-text'>{message.shortdescription}</CardDescription>
              </div>
            </CardContent>
            <Separator />
            <CardFooter>
              <Link href={`/community-messages/${message.id}`}>
                <Button variant="outline" className='button-dark-blue mx-auto'>View Message</Button>
              </Link>
            </CardFooter>
          </Card>
          
        ))}
    </div>
    </div >
  );
}