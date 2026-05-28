import type { ActivityEventItem } from "@/lib/activity";
import { recentActivity } from "@/lib/mock-data";

/** Client-safe mock activity — no database imports */
export function getMockRecentActivity(): ActivityEventItem[] {
  return recentActivity.map((item, index) => ({
    id: `mock-activity-${index}`,
    title: item.title,
    description: null,
    xp: item.xp,
    time: item.time,
    type: item.type,
  }));
}
