'use client'

import React, { useEffect, useState } from "react";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { getCommunityMessage } from "@/db/db-actions-cm";
import { getEvent } from "@/db/db-actions-events";
import { getProposalById } from "@/db/db-actions-proposals";
import { getUserById } from "@/db/db-actions-users";

interface CrumbProps {
    index: number;
    prevSegment?: string;
    segment: string;
    href: string;
    isLast: boolean;
}

export function Crumb({ index, prevSegment, segment, href, isLast }: CrumbProps) {

    const [text, setText] = useState(segment);

    useEffect(() => {
        const checkText = async() => {
            if (index != 1) return;

            switch (prevSegment){
                case "community-messages":
                    const comMes = await getCommunityMessage(parseInt(segment,10));
                    setText(comMes?.title ?? segment);
                    break;

                case "events":
                    const tmpEvent = await getEvent(parseInt(segment,10));
                    setText(tmpEvent?.title ?? segment);
                    break;

                case "proposals":
                    const tmpProp = await getProposalById(parseInt(segment, 10));
                    setText(tmpProp?.title ?? segment);
                    break;

                case "user":
                    const tmpUsr = await getUserById(segment);
                    setText((tmpUsr ? tmpUsr.firstName + " " + tmpUsr.lastName : segment));
                    break;
            }
        }
        checkText();
    }, [index, prevSegment]);

    return (
        <React.Fragment key={`crumb-${index}-${segment}`}>
            <BreadcrumbSeparator className="text-white" />
            <BreadcrumbItem>
                {isLast ? <BreadcrumbPage className="text-white capitalize">{text}</BreadcrumbPage> : <BreadcrumbLink className="text-white capitalize" href={href}>{text}</BreadcrumbLink>}
            </BreadcrumbItem>
        </React.Fragment>
    )
}