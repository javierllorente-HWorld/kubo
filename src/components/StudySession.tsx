"use client";

import { useState, useTransition } from "react";
import { BackLink } from "@/components/BackLink";
import { SessionComplete, type SessionStats } from "@/components/SessionComplete";
import { StudyCard } from "@/components/StudyCard";
import { StudySessionHeader } from "@/components/StudySessionHeader";
import { reviewCardAction } from "@/app/study/actions";
import type { SessionCard } from "@/lib/mock-data";

type StudySessionProps = {
  cards: SessionCard[];
  mode: "daily" | "deck";
  backHref: string;
  backLabel: string;
  usingMockFallback?: boolean;
  deckSlug?: string;
};

const emptyStats: SessionStats = {
  studied: 0,
  newCards: 0,
  reviewCards: 0,
};

export function StudySession({
  cards,
  mode,
  backHref,
  backLabel,
  usingMockFallback = false,
  deckSlug,
}: StudySessionProps) {
  const [cardIndex, setCardIndex] = useState(0);
  const [stats, setStats] = useState<SessionStats>(emptyStats);
  const [isComplete, setIsComplete] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (isComplete) {
    return <SessionComplete stats={stats} />;
  }

  const currentCard = cards[cardIndex];
  const sessionTotal = cards.length;

  function advanceAfterRating(ratingLabel: string) {
    setStats((prev) => ({
      studied: prev.studied + 1,
      newCards: prev.newCards + (currentCard.status === "nueva" ? 1 : 0),
      reviewCards: prev.reviewCards + (currentCard.status === "repaso" ? 1 : 0),
    }));

    if (cardIndex + 1 >= sessionTotal) {
      setIsComplete(true);
      return;
    }

    setCardIndex((index) => index + 1);
  }

  function handleRate(ratingLabel: string) {
    if (usingMockFallback) {
      advanceAfterRating(ratingLabel);
      return;
    }

    startTransition(async () => {
      const result = await reviewCardAction(currentCard.id, ratingLabel, {
        deckSlug,
      });

      if (!result.ok) {
        console.error("[StudySession] reviewCardAction:", result.error);
      }

      advanceAfterRating(ratingLabel);
    });
  }

  return (
    <>
      <BackLink href={backHref}>{backLabel}</BackLink>

      <div className="mt-4">
        <StudySessionHeader
          mode={mode}
          cardIndex={cardIndex + 1}
          sessionTotal={sessionTotal}
          cardStatus={currentCard.status}
          deckName={mode === "deck" ? currentCard.deckName : undefined}
          deckEmoji={mode === "deck" ? currentCard.deckEmoji : undefined}
          currentDeckName={mode === "daily" ? currentCard.deckName : undefined}
          currentDeckEmoji={mode === "daily" ? currentCard.deckEmoji : undefined}
        />
      </div>

      <div className="mt-5">
        <StudyCard
          key={currentCard.id}
          card={currentCard}
          onRate={handleRate}
          isRatingDisabled={isPending}
        />
      </div>
    </>
  );
}
