"use client";

import { useState, type ReactNode } from "react";
import { StudySession } from "@/components/StudySession";
import type { SessionCard } from "@/lib/mock-data";

type StudySessionGateProps = {
  initialCards: SessionCard[];
  emptyState: ReactNode;
  mode: "daily" | "deck";
  backHref: string;
  backLabel: string;
  usingMockFallback?: boolean;
  deckId?: string;
};

/**
 * Keeps the study session stable after server revalidation.
 * Once started, the card list is frozen so "Sesión completada" does not unmount
 * when due cards drop to zero on the server.
 */
export function StudySessionGate({
  initialCards,
  emptyState,
  mode,
  backHref,
  backLabel,
  usingMockFallback = false,
  deckId,
}: StudySessionGateProps) {
  const [sessionCards] = useState(initialCards);

  if (sessionCards.length === 0) {
    return emptyState;
  }

  return (
    <StudySession
      cards={sessionCards}
      mode={mode}
      backHref={backHref}
      backLabel={backLabel}
      usingMockFallback={usingMockFallback}
      deckId={deckId}
    />
  );
}
