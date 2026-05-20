import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const variantStyles = {
  default: "rounded-2xl border border-white/80 bg-white shadow-card",
  dark: "rounded-2xl border border-electric-lime/30 bg-graphite text-white shadow-card-cta",
  metric: "rounded-2xl border shadow-card",
} as const;

export type CardVariant = keyof typeof variantStyles;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export function Card({
  className,
  variant = "default",
  ...props
}: CardProps) {
  return (
    <div className={cn(variantStyles[variant], className)} {...props} />
  );
}
