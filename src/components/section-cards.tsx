
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  Megaphone,
  Vote,
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import MessagesList from "./messages-list";
import EventsList from "./events-list";
import ProposalsList from "./proposals-list";
import Link from "next/link";

import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.5, // kašnjenje po kartici
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 px-4 lg:px-6">
      {[ // ovde stavljamo sve tri kartice kao niz da možemo dodati indeks
        {
          icon: <CalendarDays className="fp-title-color w-6 h-6" />,
          title: "Events",
          content: <EventsList />,
          href: "/events",
          button: "View All Events",
        },
        {
          icon: <Megaphone className="fp-title-color w-6 h-6" />,
          title: "Community Messages",
          content: <MessagesList />,
          href: "/community-messages",
          button: "View All Messages",
        },
        {
          icon: <Vote className="fp-title-color w-6 h-6" />,
          title: "Proposals & Voting",
          content: <ProposalsList />,
          href: "/proposals",
          button: "View All Proposals",
        },
      ].map((card, index) => (
        <motion.div
          key={card.title}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="fp-card-bg h-full">
            <CardHeader className="flex items-center gap-2">
              {card.icon}
              <CardTitle className="fp-title-color text-2xl">{card.title}</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="grid gap-4 h-full">
              <div>{card.content}</div>
            </CardContent>
            <Separator />
            <CardFooter>
              <Link href={card.href} className="w-full">
                <Button className="button-dark-blue mx-auto">
                  {card.button}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}