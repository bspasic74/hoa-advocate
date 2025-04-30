import { db } from "@/db";
import { users } from "@/db/schema/users";
import { addresses } from "@/db/schema/addresses";
import { votes } from "@/db/schema/votes";
import { eq, and } from "drizzle-orm";

export async function getUsersWithAddressAndVote(proposalId: string) {
  const allUsers = await db.select({
    id: users.id,
    firstName: users.firstName,
    lastName: users.lastName,
    email: users.email,
    phone: users.phone,
    isAdmin: users.isAdmin,
    address: {
      streetAddress: addresses.streetAddress,
      city: addresses.city,
      state: addresses.state,
      zipCode: addresses.zipCode,
    },
  })
  .from(users)
  .leftJoin(addresses, eq(users.addressId, addresses.id));

 

  const results = await Promise.all(
    allUsers.map(async (user) => {
      const vote = await db.query.votes.findFirst({
        where: and(
          eq(votes.proposalId, proposalId),
          eq(votes.userId, user.id)
        ),
      });

      return {
        ...user,
        voteValue: vote ? vote.voteValue : null, 
      };
    })
  );

  return results;
}

export async function getUserVoteForProposal(userId: string, proposalId: number) {
  return await db.query.votes.findFirst({
    where: and(
      eq(votes.userId, userId),
      eq(votes.proposalId, proposalId.toString())
    ),
  });
}