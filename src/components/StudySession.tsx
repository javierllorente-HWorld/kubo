"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { BackLink } from "@/components/BackLink";
import { SessionComplete, type SessionStats } from "@/components/SessionComplete";
import { StudyCard } from "@/components/StudyCard";
import { StudySessionHeader } from "@/components/StudySessionHeader";
import {
  recordStudySessionCompletedAction,
  reviewCardAction,
} from "@/app/study/actions";
import type { SessionCard } from "@/lib/mock-data";
import { getRatingXp, parseStudyRating } from "@/lib/study-rating";

const POSTGRES_UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type StudySessionProps = {
  cards: SessionCard[];
  mode: "daily" | "deck";
  backHref: string;
  backLabel: string;
  usingMockFallback?: boolean;
  deckId?: string;
};

const emptyStats: SessionStats = {
  studied: 0,
  newCards: 0,
  reviewCards: 0,
  xpEarned: 0,
};

export function StudySession({
  cards,
  mode,
  backHref,
  backLabel,
  usingMockFallback = false,
  deckId,
}: StudySessionProps) {
  const [cardIndex, setCardIndex] = useState(0);
  const [stats, setStats] = useState<SessionStats>(emptyStats);
  const [isComplete, setIsComplete] = useState(false);
  const [isPending, startTransition] = useTransition();
  const sessionRecordedRef = useRef(false);

  useEffect(() => {
    if (!isComplete || usingMockFallback || sessionRecordedRef.current) {
      return;
    }

    if (stats.studied <= 0) {
      return;
    }

    sessionRecordedRef.current = true;

    void recordStudySessionCompletedAction({
      xpEarned: stats.xpEarned,
      studied: stats.studied,
      newCards: stats.newCards,
      reviewCards: stats.reviewCards,
      deckId,
    }).then((result) => {
      if (!result.ok) {
        console.error(
          "[StudySession] recordStudySessionCompletedAction:",
          result.error,
        );
        sessionRecordedRef.current = false;
      }
    });
  }, [isComplete, usingMockFallback, stats, deckId]);

  if (isComplete) {
    return (
      <SessionComplete stats={stats} mode={mode} deckId={deckId} />
    );
  }

  const currentCard = cards[cardIndex];
  const sessionTotal = cards.length;

  function advanceAfterRating(ratingLabel: string) {
    const rating = parseStudyRating(ratingLabel);
    const xpGained = rating ? getRatingXp(rating) : 0;

    setStats((prev) => ({
      studied: prev.studied + 1,
      newCards: prev.newCards + (currentCard.status === "nueva" ? 1 : 0),
      reviewCards: prev.reviewCards + (currentCard.status === "repaso" ? 1 : 0),
      xpEarned: prev.xpEarned + xpGained,
    }));

    if (cardIndex + 1 >= sessionTotal) {
      setIsComplete(true);
      return;
    }

    setCardIndex((index) => index + 1);
  }

  function handleRate(ratingLabel: string) {
    if (usingMockFallback) {
      console.log("[StudySession] mock fallback — no reviewCardAction", {
        cardId: currentCard.id,
        ratingLabel,
      });
      advanceAfterRating(ratingLabel);
      return;
    }

    if (!POSTGRES_UUID_RE.test(currentCard.id)) {
      console.error("[StudySession] card.id no es UUID de PostgreSQL", {
        cardId: currentCard.id,
        ratingLabel,
      });
      return;
    }

    startTransition(async () => {
      console.log("[StudySession] reviewCardAction request", {
        cardId: currentCard.id,
        ratingLabel,
      });

      try {
        const result = await reviewCardAction(currentCard.id, ratingLabel, {
          deckId,
        });

        if (!result.ok) {
          console.error("[StudySession] reviewCardAction rejected:", result.error);
          return;
        }

        console.log("[StudySession] reviewCardAction ok", {
          cardId: currentCard.id,
          ratingLabel,
        });
        advanceAfterRating(ratingLabel);
      } catch (error) {
        console.error("[StudySession] reviewCardAction threw:", error);
      }
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
