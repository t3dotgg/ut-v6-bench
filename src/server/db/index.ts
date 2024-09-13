import { drizzle } from "drizzle-orm/libsql";

import { createClient, type Client } from "@libsql/client";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

export const client =
  globalForDb.client ??
  createClient({
    url: env.TURSO_CONNECTION_URL,
    authToken: env.TURSO_AUTH_SECRET,
  });
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });
