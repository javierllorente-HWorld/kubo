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
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-graphite text-white">
      <div className="border-b border-white/10 px-6 py-6">
        <Link
          href="/dashboard"
          className="inline-flex h-12 items-center"
        >
          <Image
            src="/logo-kubo.png"
            alt="Kubo"
            width={135}
            height={45}
            className="h-auto w-[135px] object-contain"
            priority
          />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
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
                "flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-colors",
                isActive
                  ? "bg-electric-lime/15 font-semibold text-electric-lime ring-1 ring-electric-lime/10"
                  : "text-cool-gray hover:bg-white/5 hover:text-white",
              )}
            >
              <span
                className="flex w-5 shrink-0 items-center justify-center text-[16px]"
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
