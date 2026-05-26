export const dynamic = "force-dynamic";

import { getDemoUser } from "@/lib/db-queries";

export default async function DbTestPage() {
  const user = await getDemoUser();

  if (!user) {
    return (
      <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
        <h1>DB Test</h1>
        <p>No se encontró ningún usuario en la tabla users.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>DB Test</h1>
      <p>Conexión OK — datos desde PostgreSQL:</p>
      <ul>
        <li>
          <strong>Name:</strong> {user.name}
        </li>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
        <li>
          <strong>Career:</strong> {user.career}
        </li>
        <li>
          <strong>University:</strong> {user.university}
        </li>
        <li>
          <strong>Total XP:</strong> {user.total_xp}
        </li>
      </ul>
    </main>
  );
}
