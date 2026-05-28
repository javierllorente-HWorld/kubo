"use server";

import type { ActivityEventItem } from "@/lib/activity";
import { getMockRecentActivity } from "@/lib/activity-mock";
import { getRecentActivity } from "@/lib/db-queries";

export type RecentActivityLoadResult = {
  items: ActivityEventItem[];
  usingMockFallback: boolean;
};

export async function getRecentActivityAction(): Promise<ActivityEventItem[]> {
  try {
    return await getRecentActivity();
  } catch (error) {
    console.error("[activity] getRecentActivity failed:", error);
    return getMockRecentActivity();
  }
}

export async function loadRecentActivityForHeader(): Promise<RecentActivityLoadResult> {
  try {
    const items = await getRecentActivity();
    return { items, usingMockFallback: false };
  } catch (error) {
    console.error(
      "[activity] DB unavailable, using mock recent activity:",
      error,
    );
    return { items: getMockRecentActivity(), usingMockFallback: true };
  }
}
