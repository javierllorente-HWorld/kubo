"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const AUTO_DISMISS_MS = 4000;

export function useFeedback() {
  const [message, setMessage] = useState<string | null>(null);

  const showFeedback = useCallback((text: string) => {
    setMessage(text);
  }, []);

  const dismissFeedback = useCallback(() => {
    setMessage(null);
  }, []);

  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = window.setTimeout(() => {
      setMessage(null);
    }, AUTO_DISMISS_MS);

    return () => window.clearTimeout(timer);
  }, [message]);

  return { message, showFeedback, dismissFeedback };
}

type FeedbackToastProps = {
  message: string | null;
  onDismiss?: () => void;
  className?: string;
};

export function FeedbackToast({
  message,
  onDismiss,
  className,
}: FeedbackToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-4 right-4 z-[70] mx-auto max-w-md lg:bottom-6 lg:left-auto lg:right-6",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-electric-lime/35 bg-white px-4 py-3 shadow-card-lg">
        <p className="text-sm font-medium text-midnight-ink">{message}</p>
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 rounded-md px-1.5 py-0.5 text-xs font-medium text-cool-gray transition-colors hover:text-midnight-ink"
            aria-label="Cerrar mensaje"
          >
            Cerrar
          </button>
        ) : null}
      </div>
    </div>
  );
}
