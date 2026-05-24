import { DailyGoalRing } from "@/components/DailyGoalRing";
import { ButtonLink } from "@/components/ButtonLink";
import { Card } from "@/components/ui/Card";
import { dailySession } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

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
          No tenés cards pendientes. Volvé mañana o agregá nuevas cards a tus decks.
        </p>
        <ButtonLink
          href="/materias"
          variant="secondary"
          className={cn(
            "mt-5 w-full rounded-2xl border-white/20 bg-white/10 text-white shadow-none hover:bg-white/15 hover:text-white",
          )}
        >
          Ir a materias
        </ButtonLink>
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
      <p className="mt-1 text-xs font-medium text-white/70">
        Objetivo diario: {dailySession.dailyGoal} cards
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
          pendingToday={dailySession.pendingTotal}
        />
      </div>

      <ButtonLink
        href="/estudiar/sesion"
        className="mt-5 w-full rounded-2xl"
      >
        Estudiar sesión
      </ButtonLink>
    </Card>
  );
}
