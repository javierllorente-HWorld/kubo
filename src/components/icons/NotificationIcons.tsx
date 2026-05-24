import { cn } from "@/lib/cn";

type IconProps = {
  className?: string;
};

export function BellIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("h-[18px] w-[18px]", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .53-.21 1.04-.59 1.41L4 17h5"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v1a3 3 0 006 0v-1" />
    </svg>
  );
}

export type ActivityIconType = "study" | "streak" | "achievement";

const activityEmojis: Record<ActivityIconType, string> = {
  study: "✅",
  streak: "🔥",
  achievement: "🏆",
};

const activityLabels: Record<ActivityIconType, string> = {
  study: "Actividad completada",
  streak: "Racha",
  achievement: "Logro",
};

export function ActivityIconBadge({ type }: { type: ActivityIconType }) {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-soft-cloud text-lg leading-none"
      aria-hidden
      title={activityLabels[type]}
    >
      {activityEmojis[type]}
    </span>
  );
}
