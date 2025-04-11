import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const communityMessages = sqliteTable("community_messages", {
  id: text("id").primaryKey(),
  adminId: text("admin_id").notNull(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  body: text("body"),
  createdAt: integer("created_at", { mode: "timestamp" }),
});