import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const communityMessages = sqliteTable("community_messages", {
  id: integer("id") .primaryKey({autoIncrement: true}),
  adminId: text("admin_id").notNull(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  shortdescription: text("shortdescription").notNull(),
  body: text("body"),
    createdAt: integer("created_at", {mode: "timestamp"})
        .default(sql`(unixepoch())`),
      modifiedAt: integer("modified_at", {mode: "timestamp"})
        .$onUpdate(() => new Date()).$type<Date>(),
});