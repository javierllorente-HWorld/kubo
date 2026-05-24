"use client";

import { ratingButtons } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

type RatingButtonsProps = {
  onRate?: (label: string) => void;
  disabled?: boolean;
};

const ratingFocusClassName =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-midnight-ink/30 focus-visible:ring-offset-2";

export function RatingButtons({ onRate, disabled = false }: RatingButtonsProps) {
  return (
    <div>
      <p className="mb-3 text-center text-sm font-medium text-midnight-ink">
        ¿Qué tan bien recordaste esta card?
      </p>
      <div
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3"
        role="group"
        aria-label="Calificar card"
      >
        {ratingButtons.map((btn) => (
          <button
            key={btn.label}
            type="button"
            disabled={disabled}
            onClick={() => onRate?.(btn.label)}
            aria-label={`${btn.label}, próximo repaso ${btn.sublabel}`}
            className={cn(
              "flex min-h-12 cursor-pointer flex-col items-center justify-center rounded-2xl border px-3 py-3.5 text-center transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0 sm:py-4",
              btn.className,
              ratingFocusClassName,
            )}
          >
            <span className="font-display text-sm font-semibold">{btn.label}</span>
            <span className="mt-1 text-xs opacity-80">{btn.sublabel}</span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-cool-gray">
        Repetición espaciada según tu desempeño
      </p>
    </div>
  );
}
