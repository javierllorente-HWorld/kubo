import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-cool-gray/25 bg-white px-6 py-10 text-center shadow-card",
        className,
      )}
    >
      <h3 className="font-display text-base font-semibold text-midnight-ink">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-cool-gray">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
