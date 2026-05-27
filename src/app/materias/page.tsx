export const dynamic = "force-dynamic";

import { getDecksOverview } from "@/lib/db-queries";
import { getMockDecksOverview } from "@/lib/db-fallback";
import { MateriasContent } from "./MateriasContent";

export default async function MateriasPage() {
  let decks;
  let usingMockFallback = false;

  try {
    decks = await getDecksOverview();
  } catch (error) {
    console.error("[materias] DB unavailable, using mock data:", error);
    usingMockFallback = true;
    decks = getMockDecksOverview();
  }

  return <MateriasContent decks={decks} usingMockFallback={usingMockFallback} />;
}
