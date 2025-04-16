import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const proposals = sqliteTable("proposals", {
  id: integer("id") .primaryKey({autoIncrement: true}),
  adminId: text("admin_id").notNull(),
  title: text("title").notNull(),
  shortdescription: text("shortdescription").notNull(),
  description: text("description"),
  startdate: integer("startdate", { mode: "timestamp" }).notNull(),
  enddate: integer("enddate", { mode: "timestamp" }).notNull(),
  status: text("status").notNull(),
    createdAt: integer("created_at", {mode: "timestamp"})
        .default(sql`(unixepoch())`),
      modifiedAt: integer("modified_at", {mode: "timestamp"})
        .$onUpdate(() => new Date()).$type<Date>(),
});