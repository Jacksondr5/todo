import { type Config } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_DIRECT_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_DIRECT_URL is not set");
}

export const drizzleProdConfig = {
  schema: "./src/server/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
    ssl: "require",
  },
} satisfies Config;

export default {
  ...drizzleProdConfig,
  tablesFilter: [`todo_prod*`],
} satisfies Config;
