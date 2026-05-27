"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIconBadge,
  BellIcon,
} from "@/components/icons/NotificationIcons";
import { MockAuditLabel } from "@/components/dev/MockAuditLabel";
import { recentActivity, userProfile } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

type AppHeaderProps = {
  compact?: boolean;
  className?: string;
};

export function AppHeader({ compact = false, className }: AppHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!notificationsOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [notificationsOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex shrink-0 items-center justify-between gap-3 border-b border-cool-gray/15 bg-white px-4 sm:px-5 lg:justify-end lg:px-6",
        compact ? "py-2" : "py-3",
        className,
      )}
    >
      <Link
        href="/dashboard"
        className="inline-flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/40 focus-visible:ring-offset-2 lg:hidden"
        aria-label="Kubo, ir al inicio"
      >
        <Image
          src="/logo-kubo.png"
          alt=""
          width={88}
          height={30}
          className="h-7 w-auto object-contain"
          priority
        />
      </Link>

      <div className="flex items-center gap-2.5">
        <div className="relative" ref={panelRef}>
          <button
            type="button"
            onClick={() => setNotificationsOpen((open) => !open)}
            className={cn(
              "flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full border bg-white text-cool-gray shadow-sm transition-colors hover:bg-soft-cloud hover:text-midnight-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/35 focus-visible:ring-offset-2",
              compact ? "h-9 w-9 min-h-9 min-w-9" : "h-10 w-10",
              notificationsOpen
                ? "border-cool-gray/25 bg-soft-cloud text-midnight-ink"
                : "border-cool-gray/20",
            )}
            aria-label="Notificaciones"
            aria-expanded={notificationsOpen}
          >
            <BellIcon />
          </button>
          {notificationsOpen && (
            <div
              className="fixed inset-x-4 top-[3.25rem] z-[100] max-h-[min(24rem,calc(100dvh-6rem))] overflow-y-auto rounded-2xl border border-cool-gray/15 bg-white p-4 shadow-card-lg sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:max-h-none sm:w-[min(360px,calc(100vw-2rem))] sm:p-5"
              role="region"
              aria-label="Panel de notificaciones"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-display text-base font-semibold text-midnight-ink">
                  Actividad reciente
                </h2>
                <MockAuditLabel />
              </div>
              <p className="mt-0.5 text-xs text-cool-gray">
                Tus últimos avances
              </p>
              <ul className="mt-4">
                {recentActivity.map((item) => (
                  <li
                    key={item.title}
                    className="flex gap-3 border-b border-cool-gray/15 py-3.5 last:border-0"
                  >
                    <ActivityIconBadge type={item.type} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="pr-2 text-sm font-medium leading-snug text-midnight-ink">
                          {item.title}
                        </p>
                        <span className="shrink-0 rounded-full bg-electric-lime/20 px-2 py-0.5 text-[11px] font-semibold leading-none text-midnight-ink">
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
        <div className="relative shrink-0">
          <Link
            href="/perfil"
            className={cn(
              "flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-electric-lime font-display text-xs font-semibold text-midnight-ink shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/35 focus-visible:ring-offset-2",
              compact ? "h-9 w-9 min-h-9 min-w-9" : "h-10 w-10",
            )}
            aria-label={`Perfil de ${userProfile.name}`}
          >
            {userProfile.initials}
          </Link>
          <MockAuditLabel className="absolute -right-0.5 -top-1" />
        </div>
      </div>
    </header>
  );
}
