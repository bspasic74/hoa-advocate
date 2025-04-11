import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const proposals = sqliteTable("proposals", {
  id: text("id").primaryKey(),
  adminId: text("admin_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
});