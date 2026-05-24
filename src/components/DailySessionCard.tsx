import Link from "next/link";
import { DailyGoalRing } from "@/components/DailyGoalRing";
import { Card } from "@/components/ui/Card";
import { dailySession } from "@/lib/mock-data";

export function DailySessionCard() {
  const hasPending = dailySession.pendingTotal > 0;

  if (!hasPending) {
    return (
      <Card
        variant="dark"
        className="rounded-3xl border border-electric-lime/25 bg-gradient-to-br from-midnight-ink to-graphite p-5 shadow-card-lg"
      >
        <h2 className="font-display text-base font-semibold leading-snug text-white">
          Todo listo por hoy
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-cool-gray">
          No tenés cards pendientes. Volvé mañana o agregá nuevas cards.
        </p>
        <Link
          href="/materias"
          className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-white/15"
        >
          Ir a materias
        </Link>
      </Card>
    );
  }

  return (
    <Card
      variant="dark"
      className="rounded-3xl border border-electric-lime/25 bg-gradient-to-br from-midnight-ink to-graphite p-5 shadow-card-lg"
    >
      <h2 className="font-display text-base font-semibold leading-snug text-white">
        Tu sesión de hoy está lista
      </h2>
      <p className="mt-2 text-sm text-cool-gray">
        Tenés {dailySession.pendingTotal} cards pendientes para repasar.
      </p>
      <ul className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        {dailySession.breakdown.map((item) => (
          <li
            key={item.slug}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="text-white/90">{item.name}</span>
            <span className="shrink-0 font-medium text-electric-lime">
              {item.pending} cards
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 px-2">
        <DailyGoalRing
          completed={dailySession.completedCards}
          goal={dailySession.dailyGoal}
        />
      </div>

      <Link
        href="/estudiar/sesion"
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-electric-lime px-4 py-3 font-display text-sm font-semibold text-midnight-ink shadow-card transition-colors hover:bg-fresh-lime"
      >
        Estudiar sesión
      </Link>
    </Card>
  );
}
