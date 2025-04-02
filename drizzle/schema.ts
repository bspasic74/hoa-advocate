import {integer, sqliteTable, text} from "drizzle-orm/sqlite-core";
import dayjs from "dayjs";


export const todosTable = sqliteTable('todos', {
    id: integer("id").primaryKey({autoIncrement: true}),
    title: text("title").notNull(),
    completed: integer("completed", {
        mode: 'boolean'
    }),
    createdAt: integer("createdAt", {
        mode: 'timestamp'
    }).$defaultFn(() => dayjs().toDate()),
    updatedAt: integer("createdAt", {
        mode: 'timestamp'
    }).$defaultFn(() => dayjs().toDate()).$onUpdateFn(() => dayjs().toDate()),
})