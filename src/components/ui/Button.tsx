import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const baseStyles =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantStyles = {
  primary:
    "font-display bg-electric-lime text-midnight-ink shadow-sm hover:bg-fresh-lime",
  secondary:
    "border border-cool-gray/30 bg-white text-midnight-ink hover:bg-soft-cloud",
  ghost: "bg-transparent text-midnight-ink hover:bg-soft-cloud",
} as const;

export type ButtonVariant = keyof typeof variantStyles;

export function buttonClassName(
  variant: ButtonVariant = "primary",
  className?: string,
) {
  return cn(baseStyles, variantStyles[variant], className);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={buttonClassName(variant, className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
