import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core"
import { users } from "@/db/schema/users";


export const authenticators = sqliteTable(
    "authenticator",
    {
      credentialID: text("credentialID").notNull().unique(),
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      providerAccountId: text("providerAccountId").notNull(),
      credentialPublicKey: text("credentialPublicKey").notNull(),
      counter: integer("counter").notNull(),
      credentialDeviceType: text("credentialDeviceType").notNull(),
      credentialBackedUp: integer("credentialBackedUp", {
        mode: "boolean",
      }).notNull(),
      transports: text("transports"),
    },
    (authenticator) => ([
      primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    ])
  )