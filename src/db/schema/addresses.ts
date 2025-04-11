import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const addresses = sqliteTable("addresses", {
  id: text("id").primaryKey(),
  streetAddress: text("street_address").unique().notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
});