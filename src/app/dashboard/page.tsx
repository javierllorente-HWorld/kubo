export const dynamic = "force-dynamic";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { DailySessionCard } from "@/components/DailySessionCard";
import { DeckPreviewCard } from "@/components/DeckPreviewCard";
import { PageHeader } from "@/components/PageHeader";
import { getDashboardData } from "@/lib/db-queries";
import { getMockDashboardData } from "@/lib/db-fallback";
import { userProfile, streakData } from "@/lib/mock-data";
import { MockAuditSection } from "@/components/dev/MockAuditLabel";
import { cn } from "@/lib/cn";

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function DashboardPage() {
  let previewDecks;
  let dailySession;
  let stats;
  let firstName;
  let profile;
  let usingMockFallback = false;

  try {
    ({ previewDecks, dailySession, stats, firstName, profile } =
      await getDashboardData());
  } catch (error) {
    console.error("[dashboard] DB unavailable, using mock data:", error);
    usingMockFallback = true;
    ({ previewDecks, dailySession, stats, firstName, profile } =
      getMockDashboardData());
  }

  const currentStreak = stats?.current_streak_days ?? 0;
  const bestStreak = stats?.best_streak_days ?? 0;
  const completedStreakDays = Math.max(
    0,
    Math.min(currentStreak, streakData.weekDays.length),
  );
  const weekDays = streakData.weekDays.map((day, index) => ({
    label: day.label,
    completed: index < completedStreakDays,
  }));

  const headerProfile = profile
    ? { name: profile.name, initials: getInitials(profile.name) }
    : {
        name: userProfile.name,
        initials: userProfile.initials,
      };

  return (
    <AppShell
      headerProfile={headerProfile}
      showAvatarMockLabel={usingMockFallback}
      showNotificationsMockLabel
    >
      <main className="relative z-0 flex-1 p-4 sm:p-5 lg:p-6">
        <div className="mx-auto max-w-6xl">
          <PageHeader
            eyebrow="Inicio"
            title={`Hola, ${firstName}`}
            description="Tu plan de estudio para hoy."
          />

          <div className="grid gap-4 xl:grid-cols-3 xl:gap-5">
            <div className="order-1 xl:order-none xl:col-start-3 xl:row-span-2 xl:row-start-1">
              <MockAuditSection enabled={usingMockFallback}>
                <DailySessionCard dailySession={dailySession} />
              </MockAuditSection>
            </div>

            <section className="order-2 xl:order-none xl:col-span-2 xl:row-start-1">
              <MockAuditSection enabled={usingMockFallback}>
                <Card
                  variant="metric"
                  className="border-electric-lime/40 bg-electric-lime/10 p-4"
                >
                  <p className="font-display text-base font-semibold text-midnight-ink">
                    Progreso
                  </p>
                  <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm text-cool-gray">Racha actual</p>
                      <p className="mt-1 font-display text-2xl font-bold text-midnight-ink">
                        {currentStreak} días
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-midnight-ink/80">
                        Mejor racha: {bestStreak} días
                      </p>
                    </div>
                    <div
                      className="shrink-0"
                      aria-label="Calendario semanal de estudio"
                    >
                      <div className="flex gap-1.5">
                        {weekDays.map((day, index) => (
                          <div
                            key={`${day.label}-${index}`}
                            className="flex flex-col items-center gap-1"
                          >
                            <span className="text-[10px] font-medium leading-none text-cool-gray">
                              {day.label}
                            </span>
                            <span
                              className={cn(
                                "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold",
                                day.completed
                                  ? "bg-electric-lime text-midnight-ink"
                                  : "bg-cool-gray/20 text-cool-gray/70",
                              )}
                              aria-hidden
                            >
                              {day.completed ? "✓" : ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </MockAuditSection>
            </section>

            <div className="order-3 xl:order-none xl:col-span-2 xl:row-start-2">
              <MockAuditSection enabled={usingMockFallback}>
                <section>
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-display text-base font-semibold text-midnight-ink">
                      Tus decks
                    </h2>
                    <Link
                      href="/materias"
                      className="rounded-md text-sm font-medium text-cool-gray transition-colors hover:text-midnight-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/40 focus-visible:ring-offset-2"
                    >
                      Ver todos
                    </Link>
                  </div>
                  {previewDecks.length > 0 ? (
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {previewDecks.map((deck) => (
                        <DeckPreviewCard
                          key={deck.slug}
                          deck={deck}
                          href={`/materias/${deck.slug}/estudiar`}
                          showMockLabel={usingMockFallback}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-cool-gray">
                      Todavía no tenés decks para mostrar.
                    </p>
                  )}
                </section>
              </MockAuditSection>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
