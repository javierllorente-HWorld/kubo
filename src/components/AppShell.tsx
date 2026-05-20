import { AppSidebar } from "@/components/AppSidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-soft-cloud">
      <AppSidebar />
      <div className="min-h-screen pl-64">
        <div className="flex min-h-screen flex-col">{children}</div>
      </div>
    </div>
  );
}
