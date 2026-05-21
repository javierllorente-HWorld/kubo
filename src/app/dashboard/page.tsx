import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";

const streakMetric = {
  label: "Racha",
  value: "6 días",
  detail: "🔥 Seguís en racha",
  accent: "border-electric-lime/40 bg-electric-lime/10",
} as const;

const weekStreak = [
  { label: "L", completed: true },
  { label: "M", completed: true },
  { label: "M", completed: true },
  { label: "J", completed: true },
  { label: "V", completed: true },
  { label: "S", completed: true },
  { label: "D", completed: false },
] as const;

const subjects = [
  { name: "Psicología Cognitiva", emoji: "🧠", percent: 64, current: 128, total: 200 },
  { name: "Psicología Social", emoji: "👥", percent: 42, current: 84, total: 200 },
];

const dailyGoalPercent = 76;
const circumference = 2 * Math.PI * 36;
const progressOffset = circumference - (dailyGoalPercent / 100) * circumference;

export default function DashboardPage() {
  return (
    <AppShell>
      <main className="relative z-0 flex-1 p-4 sm:p-5 lg:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4">
            <h1 className="font-display text-xl font-bold text-midnight-ink sm:text-2xl">
              Inicio <span className="text-cool-gray/50">·</span> ¡Hola, Andrés! 👋
            </h1>
            <p className="mt-1 text-sm text-cool-gray">
              Listo para seguir aprendiendo hoy.
            </p>
          </div>
          <div className="grid gap-4 xl:grid-cols-3 xl:gap-5">
          <section className="order-1 xl:col-span-2 xl:row-start-1">
              <Card
                variant="metric"
                className={cn("p-4", streakMetric.accent)}
              >
                <p className="font-display text-base font-semibold text-midnight-ink">
                  Progreso
                </p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm text-cool-gray">{streakMetric.label}</p>
                    <p className="mt-1 font-display text-2xl font-bold text-midnight-ink">
                      {streakMetric.value}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-midnight-ink/80">
                      {streakMetric.detail}
                    </p>
                  </div>
                  <div
                    className="shrink-0"
                    aria-label="Calendario semanal de estudio"
                  >
                    <div className="flex gap-1.5">
                      {weekStreak.map((day, index) => (
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

          <div className="relative z-0 order-3 self-start xl:order-none xl:col-start-3 xl:row-span-2 xl:row-start-1">
            <Card
              variant="dark"
              className="rounded-3xl border border-electric-lime/25 bg-gradient-to-br from-midnight-ink to-graphite p-5 shadow-card-lg"
            >
              <h2 className="font-display text-base font-semibold leading-snug text-white">
                Hoy es un gran día para aprender ✨
              </h2>
              <p className="mt-1.5 text-sm text-cool-gray">
                Tenés 38 cards pendientes para repasar hoy.
              </p>
              <div className="mt-4 flex flex-col items-center rounded-2xl border border-electric-lime/10 bg-white/5 px-5 py-4">
                <div className="relative h-28 w-28">
                  <svg
                    className="h-28 w-28 -rotate-90"
                    viewBox="0 0 100 100"
                    aria-hidden
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      fill="none"
                      stroke="rgb(255 255 255 / 0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      fill="none"
                      stroke="#b7ff2a"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={progressOffset}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-bold text-electric-lime">
                    {dailyGoalPercent}%
                  </span>
                </div>
                <p className="mt-2 text-xs font-medium text-cool-gray">
                  Objetivo diario: 50 cards
                </p>
              </div>
              <p className="mt-4 text-center text-sm italic text-white/60">
                “La repetición de hoy es el conocimiento de mañana.”
              </p>
              <Link
                href="/materias"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-electric-lime px-4 py-3 font-display text-sm font-semibold text-midnight-ink shadow-card transition-colors hover:bg-fresh-lime"
              >
                Comenzar ahora
              </Link>
            </Card>
          </div>

          <div className="order-2 xl:order-none xl:col-span-2 xl:row-start-2">
            <section>
              <h2 className="font-display text-base font-semibold text-midnight-ink">
                Tus materias
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
                {subjects.map((subject) => (
                  <Card key={subject.name} className="p-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-soft-cloud text-2xl"
                        aria-hidden
                      >
                        {subject.emoji}
                      </span>
                      <div className="min-w-0">
                        <p className="font-display text-sm font-semibold text-midnight-ink">
                          {subject.name}
                        </p>
                        <p className="text-xs text-cool-gray">
                          {subject.percent}% completado
                        </p>
                      </div>
                    </div>
                    <ProgressBar value={subject.percent} className="mt-3" />
                    <p className="mt-2 text-xs text-cool-gray">
                      {subject.current}/{subject.total} cards
                    </p>
                  </Card>
                ))}
                <Link
                  href="/materias"
                  className="flex min-h-[9.5rem] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-cool-gray/20 bg-white p-3 shadow-card transition-colors hover:bg-soft-cloud sm:max-w-[6.5rem] sm:justify-self-start"
                  aria-label="Ver más materias"
                >
                  <span
                    className="font-display text-2xl font-light leading-none text-midnight-ink/40"
                    aria-hidden
                  >
                    &gt;
                  </span>
                  <span className="mt-1.5 text-xs font-medium text-cool-gray">
                    Ver más
                  </span>
                </Link>
              </div>
            </section>
          </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
