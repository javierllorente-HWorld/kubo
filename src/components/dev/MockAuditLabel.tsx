/** TEMP: diagnostic mock labels for Preview — remove with src/lib/mock-audit.ts */

import type { ReactNode } from "react";
import { isMockAuditEnabled } from "@/lib/mock-audit";
import { cn } from "@/lib/cn";

type MockAuditLabelProps = {
  scope?: "field" | "section";
  className?: string;
};

export function MockAuditLabel({
  scope = "field",
  className,
}: MockAuditLabelProps) {
  if (!isMockAuditEnabled()) {
    return null;
  }

  const isSection = scope === "section";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded font-mono font-bold uppercase tracking-wider ring-1",
        isSection
          ? "bg-amber-100 px-2 py-0.5 text-[10px] text-amber-950 ring-amber-300/70"
          : "bg-amber-50 px-1.5 py-px text-[9px] text-amber-900 ring-amber-200/80",
        className,
      )}
      title="Dato de diagnóstico (mock)"
    >
      {isSection ? "MOCK DATA" : "MOCK"}
    </span>
  );
}

type MockAuditSectionProps = {
  enabled: boolean;
  children: ReactNode;
  className?: string;
};

export function MockAuditSection({
  enabled,
  children,
  className,
}: MockAuditSectionProps) {
  if (!enabled || !isMockAuditEnabled()) {
    return <>{children}</>;
  }

  return (
    <div className={className}>
      <div className="mb-2">
        <MockAuditLabel scope="section" />
      </div>
      {children}
    </div>
  );
}
