import { attachDatabasePool } from "@vercel/functions";
import { awsCredentialsProvider } from "@vercel/functions/oidc";
import { Signer } from "@aws-sdk/rds-signer";
import { Pool } from "pg";

const signer = new Signer({
  hostname: process.env.DATABASE_PGHOST!,
  port: Number(process.env.DATABASE_PGPORT),
  username: process.env.DATABASE_PGUSER!,
  region: process.env.DATABASE_AWS_REGION!,
  credentials: awsCredentialsProvider({
    roleArn: process.env.DATABASE_AWS_ROLE_ARN!,
    clientConfig: { region: process.env.DATABASE_AWS_REGION },
  }),
});

const pool = new Pool({
  host: process.env.DATABASE_PGHOST,
  user: process.env.DATABASE_PGUSER,
  database: process.env.DATABASE_PGDATABASE || "postgres",
  password: () => signer.getAuthToken(),
  port: Number(process.env.DATABASE_PGPORT),
  ssl: { rejectUnauthorized: false },
});

attachDatabasePool(pool);

export async function query<T = unknown>(
  text: string,
  params?: unknown[],
): Promise<T[]> {
  const result = await pool.query(text, params);
  return result.rows as T[];
}
