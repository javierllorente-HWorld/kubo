import type { ActivityIconType } from "@/components/icons/NotificationIcons";

export type ActivityEventItem = {
  id: string;
  title: string;
  description: string | null;
  xp: string;
  time: string;
  type: ActivityIconType;
};

export function mapEventTypeToIcon(eventType: string): ActivityIconType {
  switch (eventType) {
    case "card_reviewed":
    case "study_session_completed":
      return "study";
    case "streak_updated":
    case "streak_achieved":
      return "streak";
    default:
      return "achievement";
  }
}

export function formatActivityXp(xpEarned: number): string {
  if (xpEarned <= 0) {
    return "+0 XP";
  }

  return `+${xpEarned} XP`;
}

export function formatActivityTime(createdAt: Date): string {
  const now = new Date();
  const sameDay = createdAt.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = createdAt.toDateString() === yesterday.toDateString();

  const time = createdAt.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (sameDay) {
    return `Hoy, ${time}`;
  }

  if (isYesterday) {
    return `Ayer, ${time}`;
  }

  const diffMs = now.getTime() - createdAt.getTime();
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  if (diffDays < 7) {
    return diffDays === 1 ? "Hace 1 día" : `Hace ${diffDays} días`;
  }

  return createdAt.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
  });
}
