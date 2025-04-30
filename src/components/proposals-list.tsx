'use client';

import { useEffect, useState } from 'react';
import { getProposalsList } from '@/db/db-actions-proposals';
import Link from 'next/link';
import { FileEdit } from 'lucide-react';

const ProposalsList = () => {
    const [proposals, setProposals] = useState<{ title: string; id: number }[]>([]);

    useEffect(() => {
        const fetchProposals = async () => {
            const data = await getProposalsList(5);
            setProposals(data);
        };

        fetchProposals();
    }, []);

    return (
        <div>
            <ul className="space-y-3">
                {proposals.map((proposal) => (
                    <li key={proposal.id}>
                        <Link
                            href={`/community-messages/${proposal.id}`}
                            className="flex items-center space-x-2 py-2 px-3 hover:bg-muted rounded-md transition-colors"
                        >
                            <FileEdit className="w-4 h-4 text-muted-foreground" />
                            <span className="fp-card-text text-muted-foreground">{proposal.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProposalsList;