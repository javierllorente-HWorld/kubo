export const dynamic = "force-dynamic";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/StatCard";
import {
  getUserProfile,
  getUserSettings,
  getUserStats,
} from "@/lib/db-queries";
import {
  getMockUserProfile,
  getMockUserSettings,
  getMockUserStats,
} from "@/lib/db-fallback";
import {
  MockAuditLabel,
  MockAuditSection,
} from "@/components/dev/MockAuditLabel";

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getLevelFromXp(totalXp: number): number {
  return Math.max(1, Math.floor(totalXp / 200));
}

function formatAccuracy(value: number): number {
  return value <= 1 ? Math.round(value * 100) : Math.round(value);
}

function formatDeckLabel(deckId: string | null | undefined): string {
  if (!deckId) {
    return "Sin datos todavía";
  }

  return deckId;
}

export default async function PerfilPage() {
  let profile;
  let settings;
  let stats;
  let usingMockFallback = false;

  try {
    [profile, settings, stats] = await Promise.all([
      getUserProfile(),
      getUserSettings(),
      getUserStats(),
    ]);
  } catch (error) {
    console.error("[perfil] DB unavailable, using mock data:", error);
    usingMockFallback = true;
    profile = getMockUserProfile();
    settings = getMockUserSettings();
    stats = getMockUserStats();
  }

  const name = profile?.name ?? "—";
  const email = profile?.email ?? "—";
  const career = profile?.career ?? "—";
  const university = profile?.university ?? "—";
  const totalXp = profile?.total_xp ?? 0;
  const initials = profile ? getInitials(profile.name) : "—";
  const level = getLevelFromXp(totalXp);

  const studyPreferences = [
    {
      label: "Objetivo diario",
      value: `${settings?.daily_goal_cards ?? "—"} cards`,
    },
    { label: "Recordatorios", value: "Activados", highlight: true as const },
    { label: "Modo estudio", value: settings?.study_mode ?? "—" },
  ];

  const progressSummaryStats = [
    {
      label: "Racha actual",
      value: `${stats?.current_streak_days ?? 0} días`,
    },
    {
      label: "Mejor racha",
      value: `${stats?.best_streak_days ?? 0} días`,
    },
    {
      label: "Cards estudiadas esta semana",
      value: (stats?.weekly_cards_studied ?? 0).toString(),
    },
    {
      label: "Precisión promedio",
      value: `${formatAccuracy(stats?.average_accuracy ?? 0)}%`,
    },
    {
      label: "Deck más fuerte",
      value: formatDeckLabel(stats?.strongest_deck_id),
    },
    {
      label: "Deck a reforzar",
      value: formatDeckLabel(stats?.weakest_deck_id),
    },
  ];

  const accountFields = [
    { label: "Nombre", value: name },
    { label: "Email", value: email },
    { label: "Universidad", value: university },
    { label: "Carrera", value: career },
  ];

  return (
    <AppShell>
      <main className="flex-1 p-4 sm:p-5 lg:p-6">
        <div className="mx-auto max-w-6xl">
          <PageHeader
            title="Perfil"
            description="Tu información personal y progreso de estudio."
          />

          <MockAuditSection enabled={usingMockFallback}>
            <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-4">
              <Card className="p-4 sm:p-5">
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white bg-electric-lime font-display text-base font-semibold text-midnight-ink shadow-sm"
                    aria-hidden
                  >
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-lg font-bold text-midnight-ink">
                      {name}
                    </h2>
                    <p className="mt-0.5 truncate text-sm text-cool-gray">
                      {email}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge variant="neutral">Nivel {level}</Badge>
                      <Badge variant="xp">{totalXp} XP</Badge>
                      <Badge variant="neutral">
                        Racha {stats?.current_streak_days ?? 0} días
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-5">
                <h2 className="font-display text-base font-semibold text-midnight-ink">
                  Resumen de progreso
                </h2>
                <p className="mt-0.5 text-xs text-cool-gray">
                  Tu rendimiento reciente de estudio
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {progressSummaryStats.map((stat) => (
                    <StatCard
                      key={stat.label}
                      label={stat.label}
                      value={stat.value}
                    />
                  ))}
                </div>
              </Card>

              <Card className="p-4 sm:p-5">
                <h2 className="font-display text-base font-semibold text-midnight-ink">
                  Preferencias de estudio
                </h2>
                <p className="mt-0.5 text-xs text-cool-gray">
                  Configuración de tu rutina diaria
                </p>
                <ul className="mt-3 divide-y divide-cool-gray/15 rounded-xl border border-cool-gray/15 bg-soft-cloud/40">
                  {studyPreferences.map((pref) => (
                    <li
                      key={pref.label}
                      className="flex items-center justify-between gap-3 px-3.5 py-2.5"
                    >
                      <span className="text-sm text-cool-gray">{pref.label}</span>
                      <span className="flex shrink-0 items-center gap-1.5">
                        {!usingMockFallback &&
                          pref.label === "Recordatorios" && (
                            <MockAuditLabel />
                          )}
                        {"highlight" in pref && pref.highlight ? (
                          <Badge variant="xp">{pref.value}</Badge>
                        ) : (
                          <span className="text-sm font-medium text-midnight-ink">
                            {pref.value}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card className="p-4 sm:p-5 lg:sticky lg:top-4">
              <div>
                <h2 className="font-display text-base font-semibold text-midnight-ink">
                  Cuenta
                </h2>
                <p className="mt-0.5 text-xs text-cool-gray">
                  Información personal y académica
                </p>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {accountFields.map((field) => (
                  <StatCard
                    key={field.label}
                    label={field.label}
                    value={field.value}
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full border-midnight-ink/15 font-display shadow-sm hover:border-midnight-ink/25 hover:bg-white sm:w-auto sm:min-w-[10rem]"
                >
                  Editar perfil
                </Button>
              </div>
            </Card>
            </div>
          </MockAuditSection>
        </div>
      </main>
    </AppShell>
  );
}
