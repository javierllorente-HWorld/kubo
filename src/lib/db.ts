import postgres from "postgres";

const sql = postgres({
  host: process.env.DATABASE_PGHOST,
  port: Number(process.env.DATABASE_PGPORT),
  database: process.env.DATABASE_PGDATABASE,
  username: process.env.DATABASE_PGUSER,
  ssl: process.env.DATABASE_PGSSLMODE === "require",
});

export default sql;
