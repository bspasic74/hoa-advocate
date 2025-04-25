import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const addresses = sqliteTable("addresses", {
  id: integer("id") .primaryKey({autoIncrement: true}),
  streetAddress: text("street_address").unique().notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  createdAt: integer("created_at", {mode: "timestamp"})
			.default(sql`(unixepoch())`),
		modifiedAt: integer("modified_at", {mode: "timestamp"})
			.$onUpdate(() => new Date()).$type<Date>(),
});

export const addressesRelations = relations(
  addresses, ({ many }) => ({
    users: many(users),
  })
);