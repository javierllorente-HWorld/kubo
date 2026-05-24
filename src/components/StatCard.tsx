import { cn } from "@/lib/cn";

type StatCardProps = {
  label: string;
  value: string;
  className?: string;
};

export function StatCard({ label, value, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-cool-gray/15 bg-soft-cloud/60 px-3.5 py-2.5",
        className,
      )}
    >
      <p className="text-[0.6875rem] font-medium uppercase tracking-wide text-cool-gray">
        {label}
      </p>
      <p className="mt-0.5 font-display text-sm font-semibold text-midnight-ink">
        {value}
      </p>
    </div>
  );
}
