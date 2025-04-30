'use server';

import { and, desc, eq, inArray, InferSelectModel, lt, sql } from 'drizzle-orm';
import { db } from '../db';
import { users } from './schema/users';
import { proposals, votes } from '@/schema';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

interface CreateProposalProps {
    id?: number | null,
    title: string,
    shortdescription: string,
    body: string | null,
    startDate: Date,
    endDate: Date,
    status: string,
}

export async function updateProposal({
    id,
    title,
    shortdescription,
    body,
    startDate,
    endDate,
    status,
}: CreateProposalProps): Promise<{
    success: boolean;
    message?: typeof proposals.$inferSelect;
    error?: string
}> {
    try {

        await automaticCheckProposals(); // Activate and check for finished proposals before updating

        if (!id) {
            return { success: false, error: "Proposal ID is required" };
        }

        const session = await auth();
        if (!session || !session.user) {
            console.error("User not authenticated");
            return { success: false, error: "User not authenticated" };
        }

        if (!session.user.isAdmin) {
            return { success: false, error: "User is not an admin" };
        }

        const userId = session.user.id!;

        const existingProposal = await db.query.proposals.findFirst({
            where: eq(proposals.id, id)
        });

        if (!existingProposal) {
            return { success: false, error: 'Proposal not found' };
        }
        if (existingProposal.status !== "pending") {
            return { success: false, error: 'Proposal is not pending' };
        }

        const newMessage = await db.update(proposals)
            .set({
                title,
                shortdescription,
                description: body,
                startdate: startDate,
                enddate: endDate,
                adminId: userId,
                status,
            })
            .where(eq(proposals.id, id))
            .returning()

        if (newMessage.length === 0) {
            return { success: false, error: "Proposal not found" };
        }

        revalidatePath('/proposals')
        revalidatePath(`/proposals/${id}`)

        return { success: true, message: newMessage[0] };

    } catch (error) {
        console.error("Error updating proposal:", error);
        return { success: false, error: "Error creating proposal" };
    }
}

export async function createProposal({
    title,
    shortdescription,
    body,
    startDate,
    endDate,
    status,
}: CreateProposalProps): Promise<{
    success: boolean;
    message?: typeof proposals.$inferSelect;
    error?: string
}> {
    try {
        const session = await auth();
        if (!session || !session.user) {
            console.error("User not authenticated");
            return { success: false, error: "User not authenticated" };
        }

        if (!session.user.isAdmin) {
            return { success: false, error: "User is not an admin" };
        }

        const userId = session.user.id!;

        const newMessage = await db.insert(proposals)
            .values({
                title,
                shortdescription,
                description: body,
                startdate: startDate,
                enddate: endDate,
                adminId: userId,
                status,
            })
            .returning()

        revalidatePath('/proposals')

        return { success: true, message: newMessage[0] };
    } catch (error) {
        console.error("Error creating proposal:", error);
        return { success: false, error: "Error creating proposal" };
    }
}

export async function automaticCheckProposals() {
    await activateProposals();
    await checkForFinishedProposals();
}

export async function activateProposals() {
    const currentDate = new Date();
    console.log("Pending entering");
    await db.update(proposals)
        .set({ status: "active" })
        .where(and(
            eq(proposals.status, "pending"),
            lt(proposals.startdate, currentDate)
        ));
}

export async function checkForFinishedProposals() {

    const currentDate = new Date();
    const finishedProposals = await db.query.proposals.findMany({
        where: and(
            eq(proposals.status, "active"),
            lt(proposals.enddate, currentDate)
        )
    });

    if (finishedProposals.length === 0) {
        return;
    }

    for (const proposal of finishedProposals) {

        // Get the latest votes for the proposal
        // This will give you the latest vote for each addressId
        const latestVotes = await db
            .select({
                addressId: votes.addressId,
                voteValue: sql<number>`CAST(SUBSTR(GROUP_CONCAT(${votes.voteValue}, ','), 1, 1) AS INTEGER)`.as('voteValue'),
            })
            .from(votes)
            .where(eq(votes.proposalId, proposal.id.toString()))
            .groupBy(votes.addressId)
            .orderBy(desc(votes.createdAt));

        // Then count the true/false votes
        const counts = {
            yes: 0,
            no: 0,
            total: 0
        };

        latestVotes.forEach((vote: any) => {
            if (vote.voteValue) {
                counts.yes++;
            } else {
                counts.no++;
            }
            counts.total++;
        });


        if (finishedProposals.length > 0) {
            await db.update(proposals)
                .set({ 
                    status: "finished", 
                    votesCount: counts.total, 
                    votesYesCount: counts.yes 
                })
                .where(eq(proposals.id, proposal.id))
        }
    }

}

  export async function getProposalsList(count?: number) {
    console.log("Fetching all Prposals");
    // Fetch all events from the database
    const proposalslist = await db.select().from(proposals).orderBy(desc(proposals.createdAt)).limit(count ?? 10);
    return proposalslist;
  }

export async function getProposalById(id: number) {

    await automaticCheckProposals(); // Activate and check for finished proposals before fetching

    const session = await auth();
    if (!session || !session.user) {
        console.error("User not authenticated");
        return null;
    }

    const isAdmin = session.user.isAdmin;

    const proposal = await db.query.proposals.findFirst({
        where: eq(proposals.id, id),
        with: {
            votes: {
                ...isAdmin ? { where: eq(votes.userId, session.user.id!) } : {},
                columns: {
                    createdAt: true,
                    voteValue: true,
                },
                with: {
                    user: {
                        columns: {
                            firstName: true,
                            lastName: true
                        }
                    },
                    address: {
                        columns: {
                            streetAddress: true
                        }
                    }
                }
            }
        }
    });

    return proposal || null;
}

export async function getAllProposals() {

    await automaticCheckProposals(); // Activate and check for finished proposals before fetching

    const session = await auth();
    if (!session || !session.user) {
        console.error("User not authenticated");
        return null;
    }
    const isAdmin = session.user.isAdmin;
    const proposalsList = await db.query.proposals.findMany({
        columns: {
            id: true,
            title: true,
            shortdescription: true,
            startdate: true,
            enddate: true,
            status: true,
        },
        with: {
            votes: {
                where: eq(votes.userId, session.user.id!),
                columns: {
                    createdAt: true,
                    voteValue: true,
                },
            }
        }
    });

    return proposalsList;
}

export async function voteForProposal(proposalId: number, voteValue: boolean) {

    await automaticCheckProposals(); // Activate and check for finished proposals before voting

    const session = await auth();
    if (!session || !session.user) {
        console.error("User not authenticated");
        return { success: false, error: "User not authenticated" };
    }

    const userId = session.user.id!;

    //First check if proposal is valid for voting
    const proposal = await db.query.proposals.findFirst({
        where: eq(proposals.id, proposalId)});
    if (!proposal) {
        return { success: false, error: "Proposal not found" };
    }
    if (proposal.status !== "active") {
        return { success: false, error: "Proposal is not active" };
    }

    //Then check if user is allowed to vote
    const existingVote = await db.query.votes.findFirst({
        where: and(
            eq(votes.proposalId, proposalId.toString()),
            eq(votes.userId, userId)
        ),
    });

    if (existingVote) {
        return { success: false, error: "You have already voted for this proposal" };
    }

    const newVote = await db.insert(votes)
        .values({
            proposalId: proposalId.toString(),
            userId,
            voteValue,
            addressId: session.user.addressId,
        })
        .returning()

    revalidatePath(`/proposals/${proposalId}`)

    return { success: true, message: newVote[0] };
}

export async function deleteProposal(id: number) {
    await automaticCheckProposals(); // Activate and check for finished proposals before deleting

    try {
        const existingProposal = await db.query.proposals.findFirst({
            where: eq(proposals.id, id)
        });
        if (!existingProposal) {
            return { success: false, error: 'Proposal not found' };
        }
        if (existingProposal.status !== "pending") {
            return { success: false, error: 'Proposal is not pending' };
        }

        // Delete the community message
        const result = await db.delete(proposals)
            .where(eq(proposals.id, id))

        // Revalidate paths to update UI
        revalidatePath('/proposals')
        revalidatePath('/proposals/[proposalsId]')

        return {
            success: true,
        }
    } catch (error) {
        console.error('Error deleting proposal:', error)
        return {
            success: false,
            error: 'Failed to delete proposal'
        }
    }
}

//NOT USED
export async function getProposalByIdAndCount(id: number) {

    const session = await auth();
    if (!session || !session.user) {
        console.error("User not authenticated");
        return null;
    }
    const isAdmin = session.user.isAdmin;

    const proposal = await db.query.proposals.findFirst({
        where: eq(proposals.id, id),
        with: {
            votes: isAdmin ? {
                with: {
                    user: {
                        columns: {
                            firstName: true,
                            lastName: true
                        }
                    },
                    address: {
                        columns: {
                            streetAddress: true
                        }
                    }
                }
            } : undefined,
        }
    });

    if (!proposal) {
        return null;
    }

    const latestVotes = await db
        .select({
            addressId: votes.addressId,
            voteValue: sql<number>`CAST(SUBSTR(GROUP_CONCAT(${votes.voteValue}, ','), 1, 1) AS INTEGER)`.as('voteValue'),
        })
        .from(votes)
        .where(eq(votes.proposalId, id.toString()))
        .groupBy(votes.addressId)
        .orderBy(desc(votes.createdAt));

    // Then count the true/false votes
    const counts = {
        yes: 0,
        no: 0,
        total: 0
    };

    latestVotes.forEach((vote: any) => {
        if (vote.voteValue) {
            counts.yes++;
        } else {
            counts.no++;
        }
        counts.total++;
    });

    return { proposal, counts };
}