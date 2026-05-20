"use client";

import Link from "next/link";
import { useState } from "react";
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

const recentActivity = [
  {
    title: "Estudiaste 32 cards en Anatomía",
    xp: "+20 XP",
    time: "Hoy, 10:24",
    icon: "✅",
  },
  {
    title: "Nueva mejor racha: 6 días seguidos",
    xp: "+50 XP",
    time: "Ayer, 21:15",
    icon: "🔥",
  },
  {
    title: 'Completaste el deck "Sistema Nervioso"',
    xp: "+100 XP",
    time: "Ayer, 20:40",
    icon: "🏆",
  },
];

const dailyGoalPercent = 76;
const circumference = 2 * Math.PI * 40;
const progressOffset = circumference - (dailyGoalPercent / 100) * circumference;

export default function DashboardPage() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <AppShell>
        <header className="relative z-50 flex flex-col gap-4 border-b border-cool-gray/15 bg-white/60 px-4 py-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-midnight-ink sm:text-3xl">
              ¡Hola, Andrés! 👋
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative z-50">
              <button
                type="button"
                onClick={() => setNotificationsOpen((open) => !open)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-cool-gray/20 bg-white text-sm shadow-sm transition-colors hover:bg-soft-cloud"
                aria-label="Notificaciones"
                aria-expanded={notificationsOpen}
              >
                🔔
              </button>
              {notificationsOpen && (
                <div
                  className="absolute right-0 top-full z-[100] mt-2 w-[360px] rounded-2xl border border-cool-gray/15 bg-white p-5 shadow-[0_12px_40px_rgb(17,24,39,0.08)]"
                  role="region"
                  aria-label="Panel de notificaciones"
                >
                  <h2 className="font-display text-base font-semibold text-midnight-ink">
                    Actividad reciente
                  </h2>
                  <p className="mt-0.5 text-xs text-cool-gray">
                    Tus últimos avances
                  </p>
                  <ul className="mt-4">
                    {recentActivity.map((item) => (
                      <li
                        key={item.title}
                        className="flex gap-3 border-b border-cool-gray/15 py-3.5 last:border-0"
                      >
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft-cloud text-base"
                          aria-hidden
                        >
                          {item.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="pr-2 text-sm font-medium leading-snug text-midnight-ink">
                              {item.title}
                            </p>
                            <span className="shrink-0 rounded-full bg-electric-lime/25 px-2 py-0.5 text-[11px] font-semibold leading-none text-midnight-ink">
                              {item.xp}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-cool-gray">
                            {item.time}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Link
              href="/perfil"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-electric-lime font-display text-sm font-semibold text-midnight-ink shadow-sm transition-opacity hover:opacity-90"
              aria-label="Andrés Demo"
            >
              AD
            </Link>
          </div>
        </header>

        <main className="relative z-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="grid gap-6 xl:grid-cols-3">
            <section className="order-1 xl:col-span-2 xl:row-start-1">
              <h2 className="font-display text-lg font-semibold text-midnight-ink">
                Progreso
              </h2>
              <div className="mt-4">
                <Card
                  variant="metric"
                  className={cn("p-5", streakMetric.accent)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm text-cool-gray">{streakMetric.label}</p>
                      <p className="mt-2 font-display text-2xl font-bold text-midnight-ink">
                        {streakMetric.value}
                      </p>
                      <p className="mt-1 text-xs font-medium text-midnight-ink/80">
                        {streakMetric.detail}
                      </p>
                    </div>
                        <div
                          className="shrink-0"
                          aria-label="Calendario semanal de estudio"
                        >
                          <div className="flex gap-1">
                            {weekStreak.map((day, index) => (
                              <div
                                key={`${day.label}-${index}`}
                                className="flex flex-col items-center gap-1"
                              >
                                <span className="text-[9px] font-medium leading-none text-cool-gray">
                                  {day.label}
                                </span>
                                <span
                                  className={cn(
                                    "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold",
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
              </div>
            </section>

            <div className="relative z-0 order-3 self-start xl:order-none xl:col-start-3 xl:row-span-2 xl:row-start-1">
              <Card
                variant="dark"
                className="border border-electric-lime/25 bg-gradient-to-br from-midnight-ink to-graphite p-6 shadow-[0_12px_40px_rgb(17,24,39,0.2)]"
              >
                <h2 className="font-display text-lg font-semibold text-white">
                  Hoy es un gran día para aprender ✨
                </h2>
                <p className="mt-2 text-sm text-cool-gray">
                  Tenés 38 cards pendientes para repasar hoy.
                </p>
                <div className="mt-6 flex flex-col items-center rounded-2xl border border-electric-lime/10 bg-white/5 px-6 py-5">
                  <div className="relative h-32 w-32">
                    <svg
                      className="h-32 w-32 -rotate-90"
                      viewBox="0 0 100 100"
                      aria-hidden
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="rgb(255 255 255 / 0.1)"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#b7ff2a"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={progressOffset}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold text-electric-lime">
                      {dailyGoalPercent}%
                    </span>
                  </div>
                  <p className="mt-3 text-xs font-medium text-cool-gray">
                    Objetivo diario: 50 cards
                  </p>
                </div>
                <p className="mt-5 text-center text-sm italic text-white/60">
                  “La repetición de hoy es el conocimiento de mañana.”
                </p>
                <Link
                  href="/materias"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-electric-lime px-4 py-3 font-display text-sm font-semibold text-midnight-ink shadow-sm transition-colors hover:bg-fresh-lime"
                >
                  Comenzar ahora
                </Link>
              </Card>
            </div>

            <div className="order-2 xl:order-none xl:col-span-2 xl:row-start-2">
              <section>
                <h2 className="font-display text-lg font-semibold text-midnight-ink">
                  Tus materias
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {subjects.map((subject) => (
                    <Card key={subject.name} className="p-5">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-11 w-11 items-center justify-center rounded-xl bg-soft-cloud text-xl"
                          aria-hidden
                        >
                          {subject.emoji}
                        </span>
                        <div>
                          <p className="font-display font-semibold text-midnight-ink">
                            {subject.name}
                          </p>
                          <p className="text-xs text-cool-gray">
                            {subject.percent}% completado
                          </p>
                        </div>
                      </div>
                      <ProgressBar value={subject.percent} className="mt-4" />
                      <p className="mt-3 text-sm text-cool-gray">
                        {subject.current}/{subject.total} cards
                      </p>
                    </Card>
                  ))}
                  <Link
                    href="/materias"
                    className="flex h-full min-h-[11.5rem] w-full max-w-[7.5rem] cursor-pointer flex-col items-center justify-center justify-self-start rounded-2xl border border-cool-gray/20 bg-white p-4 shadow-card transition-colors hover:bg-soft-cloud"
                    aria-label="Ver más materias"
                  >
                    <span
                      className="font-display text-3xl font-light leading-none text-midnight-ink/40"
                      aria-hidden
                    >
                      &gt;
                    </span>
                    <span className="mt-2 text-xs font-medium text-cool-gray">
                      Ver más
                    </span>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </main>
    </AppShell>
  );
}
