import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/StatCard";
import { progressSummaryStats } from "@/lib/mock-data";

export function ProgressSummary() {
  return (
    <Card className="p-4 sm:p-5">
      <h2 className="font-display text-base font-semibold text-midnight-ink">
        Resumen de progreso
      </h2>
      <p className="mt-0.5 text-xs text-cool-gray">
        Tu rendimiento reciente de estudio
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {progressSummaryStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </Card>
  );
}
