export const dynamic = "force-dynamic";

import { getDecksOverview } from "@/lib/db-queries";
import { MateriasContent } from "./MateriasContent";

export default async function MateriasPage() {
  const decks = await getDecksOverview();

  return <MateriasContent decks={decks} />;
}
