export const dynamic = "force-dynamic";

import { loadRecentActivityForHeader } from "@/app/actions/activity";
import { getSubjects } from "@/lib/db-queries";
import { getMockSubjects } from "@/lib/db-fallback";
import { MateriasContent } from "./MateriasContent";

export default async function MateriasPage() {
  let subjects;
  let usingMockFallback = false;
  const { items: recentActivity, usingMockFallback: usingMockActivity } =
    await loadRecentActivityForHeader();

  try {
    subjects = await getSubjects();
  } catch (error) {
    console.error("[materias] DB unavailable, using mock data:", error);
    usingMockFallback = true;
    subjects = getMockSubjects();
  }

  return (
    <MateriasContent
      subjects={subjects}
      usingMockFallback={usingMockFallback}
      recentActivity={recentActivity}
      usingMockActivity={usingMockActivity}
    />
  );
}
