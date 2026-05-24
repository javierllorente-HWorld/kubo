"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isMainNavActive, mainNavItems } from "@/lib/navigation";
import { cn } from "@/lib/cn";

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-cool-gray/15 bg-white shadow-[0_-4px_20px_rgb(17,24,39,0.06)] lg:hidden"
      aria-label="Navegación principal"
    >
      <div className="grid grid-cols-3 gap-1 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {mainNavItems.map((item) => {
          const isActive = isMainNavActive(pathname, item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1.5 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/50 focus-visible:ring-offset-2",
                isActive
                  ? "bg-electric-lime/25 font-semibold text-midnight-ink"
                  : "text-cool-gray hover:bg-soft-cloud hover:text-midnight-ink",
              )}
            >
              <span className="text-lg leading-none" aria-hidden>
                {item.icon}
              </span>
              <span className="font-display text-[11px] leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
