"use client";

import { useState } from "react";
import { BackLink } from "@/components/BackLink";
import { SessionComplete, type SessionStats } from "@/components/SessionComplete";
import { StudyCard } from "@/components/StudyCard";
import { StudySessionHeader } from "@/components/StudySessionHeader";
import type { SessionCard } from "@/lib/mock-data";

type StudySessionProps = {
  cards: SessionCard[];
  mode: "daily" | "deck";
  backHref: string;
  backLabel: string;
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
}: StudySessionProps) {
  const [cardIndex, setCardIndex] = useState(0);
  const [stats, setStats] = useState<SessionStats>(emptyStats);
  const [isComplete, setIsComplete] = useState(false);

  if (isComplete) {
    return <SessionComplete stats={stats} />;
  }

  const currentCard = cards[cardIndex];
  const sessionTotal = cards.length;

  function handleRate() {
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
        <StudyCard key={currentCard.id} card={currentCard} onRate={handleRate} />
      </div>
    </>
  );
}
