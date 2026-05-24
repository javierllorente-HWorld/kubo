import Link from "next/link";
import { cn } from "@/lib/cn";

type BackLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const backLinkClassName =
  "inline-flex items-center gap-1 rounded-md text-sm font-medium text-cool-gray transition-colors hover:text-midnight-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime/40 focus-visible:ring-offset-2";

export function BackLink({ href, children, className }: BackLinkProps) {
  return (
    <Link href={href} className={cn(backLinkClassName, className)}>
      <span aria-hidden>←</span>
      {children}
    </Link>
  );
}
