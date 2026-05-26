export const dynamic = "force-dynamic";

import {
  getUserProfile,
  getUserSettings,
  getUserStats,
} from "@/lib/db-queries";

export default async function DbTestPage() {
  const [profile, settings, stats] = await Promise.all([
    getUserProfile(),
    getUserSettings(),
    getUserStats(),
  ]);

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>DB Test</h1>
      <p>Datos desde PostgreSQL (usuario demo):</p>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>Profile</h2>
        {!profile ? (
          <p>No se encontró perfil en users.</p>
        ) : (
          <ul>
            <li>
              <strong>ID:</strong> {profile.id}
            </li>
            <li>
              <strong>Name:</strong> {profile.name}
            </li>
            <li>
              <strong>Email:</strong> {profile.email}
            </li>
            <li>
              <strong>Career:</strong> {profile.career}
            </li>
            <li>
              <strong>University:</strong> {profile.university}
            </li>
            <li>
              <strong>Total XP:</strong> {profile.total_xp}
            </li>
          </ul>
        )}
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>Settings</h2>
        {!settings ? (
          <p>No se encontraron settings en user_settings.</p>
        ) : (
          <ul>
            <li>
              <strong>Daily goal cards:</strong> {settings.daily_goal_cards}
            </li>
            <li>
              <strong>Study mode:</strong> {settings.study_mode}
            </li>
          </ul>
        )}
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>Stats</h2>
        {!stats ? (
          <p>No se encontraron stats en user_stats.</p>
        ) : (
          <ul>
            <li>
              <strong>Current streak days:</strong> {stats.current_streak_days}
            </li>
            <li>
              <strong>Best streak days:</strong> {stats.best_streak_days}
            </li>
            <li>
              <strong>Weekly cards studied:</strong>{" "}
              {stats.weekly_cards_studied}
            </li>
            <li>
              <strong>Average accuracy:</strong> {stats.average_accuracy}
            </li>
            <li>
              <strong>Strongest deck ID:</strong>{" "}
              {stats.strongest_deck_id ?? "—"}
            </li>
            <li>
              <strong>Weakest deck ID:</strong> {stats.weakest_deck_id ?? "—"}
            </li>
          </ul>
        )}
      </section>
    </main>
  );
}
