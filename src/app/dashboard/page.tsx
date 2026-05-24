import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { DailySessionCard } from "@/components/DailySessionCard";
import { DeckPreviewCard } from "@/components/DeckPreviewCard";
import { PageHeader } from "@/components/PageHeader";
import { decks, streakData, userProfile } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

export default function DashboardPage() {
  const previewDecks = decks.slice(0, 2);
  const firstName = userProfile.name.split(" ")[0];

  return (
    <AppShell>
      <main className="relative z-0 flex-1 p-4 sm:p-5 lg:p-6">
        <div className="mx-auto max-w-6xl">
          <PageHeader
            eyebrow="Inicio"
            title={`Hola, ${firstName}`}
            description="Tu plan de estudio para hoy."
          />

          <div className="grid gap-4 xl:grid-cols-3 xl:gap-5">
            <div className="order-1 xl:order-none xl:col-start-3 xl:row-span-2 xl:row-start-1">
              <DailySessionCard />
            </div>

            <section className="order-2 xl:order-none xl:col-span-2 xl:row-start-1">
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
                      {streakData.current} días
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-midnight-ink/80">
                      Mejor racha: {streakData.best} días
                    </p>
                  </div>
                  <div
                    className="shrink-0"
                    aria-label="Calendario semanal de estudio"
                  >
                    <div className="flex gap-1.5">
                      {streakData.weekDays.map((day, index) => (
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
            </section>

            <div className="order-3 xl:order-none xl:col-span-2 xl:row-start-2">
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
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {previewDecks.map((deck) => (
                    <DeckPreviewCard
                      key={deck.slug}
                      deck={deck}
                      href={`/materias/${deck.slug}/estudiar`}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
