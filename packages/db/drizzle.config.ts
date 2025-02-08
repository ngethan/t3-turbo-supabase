import type { Config } from "drizzle-kit";

import { env } from "./env";

const nonPoolingUrl = env.DATABASE_URL.replace(":6543", ":5432");

if (!env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

export default {
  schema: "./src/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: nonPoolingUrl,
  },
  verbose: true,
  strict: true,
} satisfies Config;
