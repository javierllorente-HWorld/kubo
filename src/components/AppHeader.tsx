"use client";

import Link from "next/link";
import { useState } from "react";
import { recentActivity, userProfile } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

type AppHeaderProps = {
  compact?: boolean;
  className?: string;
};

export function AppHeader({ compact = false, className }: AppHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex shrink-0 items-center justify-end border-b border-cool-gray/15 bg-white px-4 sm:px-5 lg:px-6",
        compact ? "py-2" : "py-3",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <div className="relative z-50">
          <button
            type="button"
            onClick={() => setNotificationsOpen((open) => !open)}
            className={cn(
              "flex cursor-pointer items-center justify-center rounded-full border border-cool-gray/20 bg-white text-sm shadow-sm transition-colors hover:bg-soft-cloud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/50 focus-visible:ring-offset-2",
              compact ? "h-8 w-8" : "h-9 w-9",
            )}
            aria-label="Notificaciones"
            aria-expanded={notificationsOpen}
          >
            <span aria-hidden className="text-base leading-none">
              ···
            </span>
          </button>
          {notificationsOpen && (
            <div
              className="absolute right-0 top-full z-[100] mt-2 w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-cool-gray/15 bg-white p-5 shadow-card-lg"
              role="region"
              aria-label="Panel de notificaciones"
            >
              <h2 className="font-display text-base font-semibold text-midnight-ink">
                Actividad reciente
              </h2>
              <p className="mt-0.5 text-xs text-cool-gray">
                Tus últimos avances
              </p>
              <ul className="mt-4">
                {recentActivity.map((item) => (
                  <li
                    key={item.title}
                    className="flex gap-3 border-b border-cool-gray/15 py-3.5 last:border-0"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft-cloud font-display text-xs font-semibold text-midnight-ink"
                      aria-hidden
                    >
                      {item.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="pr-2 text-sm font-medium leading-snug text-midnight-ink">
                          {item.title}
                        </p>
                        <span className="shrink-0 rounded-full bg-electric-lime/25 px-2 py-0.5 text-[11px] font-semibold leading-none text-midnight-ink">
                          {item.xp}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-cool-gray">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Link
          href="/perfil"
          className={cn(
            "flex shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-electric-lime font-display text-xs font-semibold text-midnight-ink shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/50 focus-visible:ring-offset-2",
            compact ? "h-8 w-8" : "h-9 w-9",
          )}
          aria-label={`Perfil de ${userProfile.name}`}
        >
          {userProfile.initials}
        </Link>
      </div>
    </header>
  );
}
