import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const variantStyles = {
  primary:
    "font-display bg-electric-lime text-midnight-ink shadow-sm hover:bg-fresh-lime",
  secondary:
    "border border-cool-gray/30 bg-white text-midnight-ink hover:bg-soft-cloud",
  ghost: "bg-transparent text-midnight-ink hover:bg-soft-cloud",
} as const;

export type ButtonVariant = keyof typeof variantStyles;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
