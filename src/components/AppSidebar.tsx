"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isMainNavActive, mainNavItems } from "@/lib/navigation";
import { cn } from "@/lib/cn";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden h-[100dvh] w-56 flex-col overflow-hidden bg-graphite text-white lg:flex">
      <div className="border-b border-white/10 px-5 py-5">
        <Link
          href="/dashboard"
          className="inline-flex h-10 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/50 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite"
        >
          <Image
            src="/logo-kubo.png"
            alt="Kubo"
            width={120}
            height={40}
            className="h-auto w-[120px] object-contain"
            priority
          />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1.5 px-3 py-4" aria-label="Navegación principal">
        {mainNavItems.map((item) => {
          const isActive = isMainNavActive(pathname, item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-3.5 rounded-2xl px-3.5 py-2.5 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/50 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite",
                isActive
                  ? "bg-electric-lime font-semibold text-midnight-ink shadow-sm"
                  : "text-white/85 hover:bg-white/5 hover:text-white",
              )}
            >
              <span
                className="flex w-7 shrink-0 items-center justify-center text-[22px] leading-none"
                aria-hidden
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
