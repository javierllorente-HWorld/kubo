import Link from "next/link";
import { type ComponentProps } from "react";
import { buttonClassName, type ButtonVariant } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link {...props} className={cn(buttonClassName(variant), className)}>
      {children}
    </Link>
  );
}
