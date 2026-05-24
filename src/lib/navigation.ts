export const mainNavItems = [
  { label: "Inicio", href: "/dashboard", icon: "🏠" },
  { label: "Materias", href: "/materias", icon: "📚" },
  { label: "Perfil", href: "/perfil", icon: "👤" },
] as const;

export function isMainNavActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") {
    return pathname === href || pathname.startsWith("/estudiar");
  }

  if (href === "/materias") {
    return pathname.startsWith("/materias");
  }

  return pathname === href;
}
