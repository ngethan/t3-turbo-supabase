import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { env } from "../env";
import * as schema from "./schema";

const { Pool } = pg;

let connection: pg.Pool;

if (
  env.NEXT_PUBLIC_APP_ENV === "production" ||
  env.NEXT_PUBLIC_APP_ENV === "staging"
) {
  connection = new Pool({
    connectionString: env.DATABASE_URL + "?sslmode=require",
    max: 1,
  });
} else {
  const globalConnection = global as typeof globalThis & {
    connection: pg.Pool;
  };

  globalConnection.connection = new Pool({
    connectionString: env.DATABASE_URL + "?sslmode=require",
    max: 20,
  });

  connection = globalConnection.connection;
}

const db = drizzle(connection, {
  schema,
  logger:
    env.NEXT_PUBLIC_APP_ENV === "development" && env.LOG_SQL_QUERIES === true,
});

export * from "./schema";
export { db };
