/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
    DATABASE_URL: z.string(),
    LOG_SQL_QUERIES: z.boolean().optional().default(false),
    ENABLE_STATSD: z.boolean().optional().default(false),
    STATSD_HOST: z.string().optional(),
    STATSD_PORT: z.number().optional(),
    STATSD_PASSWORD: z.string().optional(),
  },

  client: {
    NEXT_PUBLIC_APP_ENV: z
      .enum(["development", "staging", "production"])
      .default("development"),
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    LOG_SQL_QUERIES: process.env.LOG_SQL_QUERIES === "true",
    ENABLE_STATSD: process.env.ENABLE_STATSD === "true",
    STATSD_HOST: process.env.STATSD_HOST,
    STATSD_PORT: parseInt(process.env.STATSD_PORT ?? "8125", 10),
    STATSD_PASSWORD: process.env.STATSD_PASSWORD,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
