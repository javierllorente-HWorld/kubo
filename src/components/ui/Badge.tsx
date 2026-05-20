import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const variantStyles = {
  neutral:
    "rounded-lg bg-soft-cloud px-2.5 py-1 text-xs font-semibold text-midnight-ink",
  xp: "rounded-lg bg-electric-lime/20 px-2.5 py-1 text-xs font-semibold text-midnight-ink",
  streak:
    "rounded-xl border border-electric-lime/30 bg-soft-cloud px-3 py-2 text-center text-xs font-semibold text-midnight-ink",
} as const;

export type BadgeVariant = keyof typeof variantStyles;

export interface BadgeProps extends HTMLAttributes<HTMLElement> {
  variant?: BadgeVariant;
}

export function Badge({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  const Component = variant === "streak" ? "div" : "span";

  return <Component className={cn(variantStyles[variant], className)} {...props} />;
}
