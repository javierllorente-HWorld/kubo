import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  action,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-wide text-cool-gray">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={cn(
            "font-display text-xl font-bold text-midnight-ink sm:text-2xl",
            eyebrow && "mt-1",
          )}
        >
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-sm text-cool-gray">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
