import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ButtonLink";
import { StatCard } from "@/components/StatCard";

export type SessionStats = {
  studied: number;
  newCards: number;
  reviewCards: number;
};

type SessionCompleteProps = {
  stats: SessionStats;
};

export function SessionComplete({ stats }: SessionCompleteProps) {
  return (
    <Card className="p-6 text-center sm:p-8">
      <h2 className="font-display text-xl font-bold text-midnight-ink sm:text-2xl">
        Sesión completada
      </h2>
      <p className="mt-2 text-sm text-cool-gray">
        Terminaste las cards programadas para hoy.
      </p>

      <div className="mt-6 grid gap-2 text-left sm:grid-cols-3">
        <StatCard label="Cards estudiadas" value={stats.studied.toString()} />
        <StatCard label="Cards nuevas" value={stats.newCards.toString()} />
        <StatCard label="Cards de repaso" value={stats.reviewCards.toString()} />
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <ButtonLink
          href="/dashboard"
          variant="primary"
          className="w-full sm:w-auto sm:min-w-[10rem]"
        >
          Volver a Inicio
        </ButtonLink>
        <ButtonLink
          href="/materias"
          variant="secondary"
          className="w-full sm:w-auto sm:min-w-[10rem]"
        >
          Ver materias
        </ButtonLink>
      </div>
    </Card>
  );
}
