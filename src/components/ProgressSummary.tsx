import { Card } from "@/components/ui/Card";
import { progressStats } from "@/lib/mock-data";

const stats = [
  { label: "Racha actual", value: `${progressStats.currentStreak} días` },
  { label: "Mejor racha", value: `${progressStats.bestStreak} días` },
  {
    label: "Cards estudiadas esta semana",
    value: progressStats.cardsStudiedThisWeek.toString(),
  },
  { label: "Precisión promedio", value: `${progressStats.averageAccuracy}%` },
  { label: "Materia más fuerte", value: progressStats.strongestSubject },
  { label: "Materia a reforzar", value: progressStats.weakestSubject },
];

export function ProgressSummary() {
  return (
    <Card className="p-4 sm:p-5">
      <h2 className="font-display text-base font-semibold text-midnight-ink">
        Resumen de progreso
      </h2>
      <p className="mt-0.5 text-xs text-cool-gray">
        Tu rendimiento reciente de estudio
      </p>
      <dl className="mt-4 grid gap-2 sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-cool-gray/15 bg-soft-cloud/60 px-3.5 py-2.5"
          >
            <dt className="text-[0.6875rem] font-medium uppercase tracking-wide text-cool-gray">
              {stat.label}
            </dt>
            <dd className="mt-0.5 font-display text-sm font-semibold text-midnight-ink">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
