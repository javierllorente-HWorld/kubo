type DailyGoalRingProps = {
  completed: number;
  goal: number;
  pendingToday?: number;
};

const RADIUS = 32;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function DailyGoalRing({
  completed,
  goal,
  pendingToday,
}: DailyGoalRingProps) {
  const percent =
    goal > 0 ? Math.min(100, Math.round((completed / goal) * 100)) : 0;
  const progressOffset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  return (
    <div
      className="flex flex-col items-center"
      role="progressbar"
      aria-valuenow={completed}
      aria-valuemin={0}
      aria-valuemax={goal}
      aria-label={`Objetivo diario: ${completed} de ${goal} cards completadas`}
    >
      <div className="relative h-24 w-24">
        <svg
          className="h-24 w-24 -rotate-90"
          viewBox="0 0 80 80"
          aria-hidden
        >
          <circle
            cx="40"
            cy="40"
            r={RADIUS}
            fill="none"
            stroke="rgb(255 255 255 / 0.1)"
            strokeWidth="6"
          />
          <circle
            cx="40"
            cy="40"
            r={RADIUS}
            fill="none"
            stroke="#b7ff2a"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={progressOffset}
            className="transition-[stroke-dashoffset] duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-lg font-bold leading-none text-electric-lime">
            {completed}/{goal}
          </span>
        </div>
      </div>
      <p className="mt-2.5 text-xs font-medium text-cool-gray">Objetivo diario</p>
      {pendingToday !== undefined ? (
        <p className="mt-1 text-xs text-white/60">
          {pendingToday} pendientes hoy
        </p>
      ) : null}
    </div>
  );
}
