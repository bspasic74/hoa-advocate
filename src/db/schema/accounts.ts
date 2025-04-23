import { sqliteTable, text, integer, SQLiteColumn, primaryKey } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters"
import { users } from "@/db/schema/users";

export const accounts = sqliteTable ("account", {
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccountType>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
      createdAt: integer("created_at", {mode: "timestamp"})
          .default(sql`(unixepoch())`),
},
    (account) => ([
        primaryKey({
        columns: [account.provider, account.providerAccountId],
        }),
    ])
);
