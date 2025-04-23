import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

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