import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

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