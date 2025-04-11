import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  adminId: text("admin_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  eventDate: integer("event_date", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
});