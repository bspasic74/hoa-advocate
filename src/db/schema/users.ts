import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { addresses } from "./addresses";

export const users = sqliteTable("users", {
  id: text("id")
  .primaryKey()
  .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  passwordHash: text("password_hash").notNull(),
  phone: text("phone"),
  image: text("image"),
  addressId: text("address_id"),
  isAdmin: integer("is_admin", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }),
});

export const usersRelations = relations(
  users, ({ one }) => ({
    address: one(addresses, { fields: [users.addressId], references: [addresses.id] }),
  })
);