import path from "node:path";
import * as fs from "node:fs";
import {Config} from "drizzle-kit";

function getLocalD1DB() {
    console.log("Getting local D1 DB path")
    try {
        const basePath = path.resolve(".wrangler")
        const dbFile = fs.readdirSync(basePath, {encoding: "utf-8", recursive: true}).find((f) => f.endsWith('.sqlite'))

        if (!dbFile) {
            throw new Error('.sqlite file not found')
        }

        const url = path.resolve(basePath, dbFile)
        return url;
    } catch (e) {
        console.error(`Error ${e}`)
    }
}

export default ({
    schema: './src/schema.ts',
    out: './drizzle',
    ...(process.env.NODE_ENV === 'production' ? {
        driver: 'd1-http', 
        dialect: 'sqlite',
        dbCredentials: {
            accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
            databaseId: process.env.CLOUDFLARE_DATABASE_ID,
            token: process.env.CLOUDFLARE_D1_API_TOKEN
        }
    } : {
        dialect:'sqlite',
        dbCredentials: {
            url: getLocalD1DB()
        }
    })
} satisfies Config);