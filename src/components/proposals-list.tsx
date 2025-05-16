'use client';

import { useEffect, useState } from 'react';
import { getProposalsList } from '@/db/db-actions-proposals';
import Link from 'next/link';
import { FileEdit } from 'lucide-react';

const ProposalsList = () => {
    const [proposals, setProposals] = useState<{
        title: string;
        id: number;
        shortdescription: string;
        startdate: string;
        enddate: string;
    }[]>([]);

    useEffect(() => {
        const fetchProposals = async () => {
            const data = await getProposalsList(3);
            setProposals(
                data.map((proposal) => ({
                    id: proposal.id,
                    title: proposal.title,
                    shortdescription: proposal.shortdescription,
                    startdate: proposal.startdate instanceof Date ? proposal.startdate.toISOString() : String(proposal.startdate),
                    enddate: proposal.enddate instanceof Date ? proposal.enddate.toISOString() : String(proposal.enddate),
                }))
            );
        };

        fetchProposals();
    }, []);

    return (
        <div>
            <ul className="space-y-3">
                {proposals.map((proposal) => (
                    <li key={proposal.id}>
                        <Link
                            href={`/proposals/${proposal.id}`}
                            className="flex items-center space-x-2 py-2 px-3 hover:bg-muted rounded-md transition-colors"
                        >
                            <FileEdit className="w-4 h-4 text-muted-foreground" />
                            <span className="fp-card-title">{proposal.title}</span>
                        </Link>

                        {/* Start and End Dates */}
                        <div className="flex justify-between px-3 text-sm text-muted-foreground fp-card-eventdate">
                            <span>Vote start: {new Date(proposal.startdate).toLocaleDateString()}</span>
                            <span>Vote end: {new Date(proposal.enddate).toLocaleDateString()}</span>
                        </div>

                        <div className="fp-card-sd px-3">
                            <p>{proposal.shortdescription}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProposalsList;