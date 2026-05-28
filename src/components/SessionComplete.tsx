import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ButtonLink";
import { StatCard } from "@/components/StatCard";
import { deckStudyHref } from "@/lib/deck-routes";

export type SessionStats = {
  studied: number;
  newCards: number;
  reviewCards: number;
  xpEarned: number;
};

type SessionCompleteProps = {
  stats: SessionStats;
  mode?: "daily" | "deck";
  deckId?: string;
};

export function SessionComplete({
  stats,
  mode = "daily",
  deckId,
}: SessionCompleteProps) {
  const closingMessage =
    stats.studied === 0
      ? "No estudiaste cards en esta sesión."
      : stats.studied === 1
        ? "Completaste 1 card en esta sesión. ¡Seguí así!"
        : `Completaste ${stats.studied} cards en esta sesión. ¡Buen trabajo!`;

  return (
    <Card className="p-5 text-center sm:p-8">
      <h2 className="font-display text-xl font-bold text-midnight-ink sm:text-2xl">
        Sesión completada
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-cool-gray">{closingMessage}</p>
      <p className="mt-1 text-xs text-cool-gray">
        Cada repaso refuerza tu memoria a largo plazo.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-2 text-left sm:grid-cols-2">
        <StatCard label="Cards estudiadas" value={stats.studied.toString()} />
        <StatCard
          label="XP ganado en esta sesión"
          value={`+${stats.xpEarned}`}
        />
        <StatCard label="Cards nuevas" value={stats.newCards.toString()} />
        <StatCard label="Cards de repaso" value={stats.reviewCards.toString()} />
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <ButtonLink
          href="/dashboard"
          variant="primary"
          className="w-full min-h-11 sm:min-w-[10rem]"
        >
          Volver al inicio
        </ButtonLink>
        <ButtonLink
          href="/materias"
          variant="secondary"
          className="w-full min-h-11 sm:min-w-[10rem]"
        >
          Ver materias
        </ButtonLink>
        {mode === "daily" ? (
          <ButtonLink
            href="/estudiar/sesion"
            variant="secondary"
            className="w-full min-h-11 sm:min-w-[10rem]"
          >
            Seguir estudiando
          </ButtonLink>
        ) : null}
        {mode === "deck" && deckId ? (
          <ButtonLink
            href={deckStudyHref(deckId)}
            variant="secondary"
            className="w-full min-h-11 sm:min-w-[10rem]"
          >
            Seguir con este deck
          </ButtonLink>
        ) : null}
      </div>
    </Card>
  );
}
