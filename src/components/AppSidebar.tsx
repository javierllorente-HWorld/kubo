"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const navItems = [
  { label: "Inicio", href: "/dashboard", icon: "🏠" },
  { label: "Materias", href: "/materias", icon: "📚" },
  { label: "Perfil", href: "/perfil", icon: "👤" },
] as const;

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex h-screen w-56 flex-col overflow-hidden bg-graphite text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <Link href="/dashboard" className="inline-flex h-10 items-center">
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

      <nav className="flex flex-1 flex-col gap-1.5 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/materias"
              ? pathname.startsWith("/materias")
              : pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3.5 rounded-2xl px-3.5 py-2.5 text-[15px] font-medium transition-colors",
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
