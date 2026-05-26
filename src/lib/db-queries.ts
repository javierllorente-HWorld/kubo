import sql from "@/lib/db";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  career: string;
  university: string;
  total_xp: number;
};

export async function getDemoUser(): Promise<DemoUser | null> {
  const rows = await sql<DemoUser[]>`
    SELECT id, name, email, career, university, total_xp
    FROM users
    LIMIT 1
  `;

  return rows[0] ?? null;
}
