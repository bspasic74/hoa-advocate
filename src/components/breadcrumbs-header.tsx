'use client'

import React, { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from './ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { getCommunityMessage } from '@/db/db-actions-cm';
import { getEvent } from '@/db/db-actions-events';
import { getProposalById } from '@/db/db-actions-proposals';
import { getUserById } from '@/db/db-actions-users';



export function BreadcrumbsHeader({pathname}:{pathname:string}) {
    //const pathname = usePathname();

    const pathSegments = pathname.split("/").filter((segment) => segment);
  
    const [shownSegmentNames, setShownSegmentNames] = useState<string[]>(pathSegments);
  
    function toTitleCase(str: string) {
      return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    }

    /*
    useEffect(() => {
        const getRealNames = async() =>{
            if (pathSegments.length < 2)
                return;

            let newTitles = [...pathSegments];

            switch (pathSegments[0]){
                case "community-messages":
                    const comMes = await getCommunityMessage(parseInt(pathSegments[1],10));
                    newTitles[1] = comMes?.title ?? newTitles[1];
                    setShownSegmentNames(newTitles);
                    break;

                case "events":
                    const tmpEvent = await getEvent(parseInt(pathSegments[1],10));
                    newTitles[1] = tmpEvent?.title ?? newTitles[1];
                    setShownSegmentNames(newTitles);
                    break;

                case "proposals":
                    const tmpProp = await getProposalById(parseInt(pathSegments[1], 10));
                    newTitles[1] = tmpProp?.title ?? newTitles[1];
                    setShownSegmentNames(newTitles);
                    break;

                case "user":
                    const tmpUsr = await getUserById(pathSegments[1]);
                    newTitles[1] = (tmpUsr ? tmpUsr.firstName + " " + tmpUsr.lastName : newTitles[1])
                    setShownSegmentNames(newTitles);
                    break;
            }
        }

        getRealNames();
    },[pathname])
  */
  

    const breadcrumbs = pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const isLast = index === pathSegments.length - 1;
    
        return (
          <BreadcrumbItem key={href}>
            {isLast ? (
              <BreadcrumbLink
                aria-current="page"
                className="text-muted-foreground cursor-default"
              >
                {shownSegmentNames[index]}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbLink href={href}>{shownSegmentNames[index]}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        )
      })

    return (
        <Breadcrumb className="text-white whitespace-nowrap overflow-x-auto">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((crumb, index) => (
            
            <span key={index} className="flex flex-row gap-1.5 sm:gap-2.5 items-center">
              <BreadcrumbSeparator className="text-white" />
              {crumb}
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
};