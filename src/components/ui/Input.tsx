import {
  forwardRef,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-cool-gray/30 bg-white px-4 py-3 text-sm text-midnight-ink outline-none transition-shadow placeholder:text-cool-gray/70 focus:border-electric-lime focus:ring-2 focus:ring-electric-lime/25",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export function InputLabel({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "block text-sm font-medium text-midnight-ink",
        className,
      )}
      {...props}
    />
  );
}
