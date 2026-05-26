import { Signer } from "@aws-sdk/rds-signer";
import { Pool } from "pg";

const signer = new Signer({
  hostname: process.env.DATABASE_PGHOST!,
  port: Number(process.env.DATABASE_PGPORT || 5432),
  username: process.env.DATABASE_PGUSER!,
  region: process.env.DATABASE_AWS_REGION!,
});

const pool = new Pool({
  host: process.env.DATABASE_PGHOST,
  port: Number(process.env.DATABASE_PGPORT || 5432),
  database: process.env.DATABASE_PGDATABASE,
  user: process.env.DATABASE_PGUSER,
  password: async () => signer.getAuthToken(),
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function query<T = unknown>(
  text: string,
  params?: unknown[],
): Promise<T[]> {
  const result = await pool.query(text, params);
  return result.rows as T[];
}
