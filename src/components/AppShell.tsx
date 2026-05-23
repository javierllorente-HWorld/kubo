import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";

type AppShellProps = {
  children: React.ReactNode;
  compactHeader?: boolean;
};

export function AppShell({ children, compactHeader }: AppShellProps) {
  return (
    <div className="h-screen overflow-hidden bg-soft-cloud">
      <AppSidebar />
      <div className="flex h-full min-w-0 flex-col pl-56">
        <AppHeader compact={compactHeader} className="shrink-0" />
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
