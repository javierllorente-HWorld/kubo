import { cn } from "@/lib/cn";

export interface ProgressBarProps {
  value: number;
  className?: string;
  barClassName?: string;
}

export function ProgressBar({
  value,
  className,
  barClassName,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "h-2 overflow-hidden rounded-full bg-soft-cloud",
        className,
      )}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-full bg-electric-lime transition-all",
          barClassName,
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
