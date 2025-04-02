import {defineConfig} from "drizzle-kit";
export default defineConfig({
    dialect: 'sqlite',
    schema: './app/api/server/schema.ts',
    out: './drizzle',
})