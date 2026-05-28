export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { loadRecentActivityForHeader } from "@/app/actions/activity";
import {
  getDecksBySubjectId,
  getSubjectById,
} from "@/lib/db-queries";
import {
  getMockDecksBySubjectId,
  getMockSubjectById,
} from "@/lib/db-fallback";
import { SubjectDecksContent } from "./SubjectDecksContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SubjectDecksPage({ params }: PageProps) {
  const { slug: subjectId } = await params;
  let subject;
  let decks;
  let usingMockFallback = false;
  const { items: recentActivity, usingMockFallback: usingMockActivity } =
    await loadRecentActivityForHeader();

  try {
    subject = await getSubjectById(subjectId);
    if (!subject) {
      notFound();
    }
    decks = await getDecksBySubjectId(subjectId);
  } catch (error) {
    console.error(
      `[materias/${subjectId}] DB unavailable, using mock data:`,
      error,
    );
    usingMockFallback = true;
    subject = getMockSubjectById(subjectId);
    if (!subject) {
      notFound();
    }
    decks = getMockDecksBySubjectId(subjectId);
  }

  return (
    <SubjectDecksContent
      subject={subject}
      decks={decks}
      usingMockFallback={usingMockFallback}
      recentActivity={recentActivity}
      usingMockActivity={usingMockActivity}
    />
  );
}
