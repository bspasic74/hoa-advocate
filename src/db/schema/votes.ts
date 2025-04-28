import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { proposals } from "./proposals";
import { addresses } from "./addresses";

export const votes = sqliteTable("votes", {
  id: integer("id") .primaryKey({autoIncrement: true}),
  proposalId: text("proposal_id").notNull(),
  userId: text("user_id").notNull(),
  addressId: text("address_id").notNull(),
  voteValue: integer("vote_value", { mode: "boolean" }).notNull(),
  createdAt: integer("created_at", {mode: "timestamp"})
      .default(sql`(unixepoch())`),
    modifiedAt: integer("modified_at", {mode: "timestamp"})
      .$onUpdate(() => new Date()).$type<Date>(),
});

export const votesRelations = relations(
  votes, ({ one, many}) => ({
    user: one(users, { fields: [votes.userId], references: [users.id] }),
    proposal: one(proposals, { fields: [votes.proposalId], references: [proposals.id] }),
    address: one(addresses, { fields: [votes.addressId], references: [addresses.id] }),
  })
);