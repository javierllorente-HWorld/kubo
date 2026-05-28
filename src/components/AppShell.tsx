import { AppBottomNav } from "@/components/AppBottomNav";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import type { ActivityEventItem } from "@/lib/activity";

type HeaderProfile = {
  name: string;
  initials: string;
};

type AppShellProps = {
  children: React.ReactNode;
  compactHeader?: boolean;
  headerProfile?: HeaderProfile;
  recentActivity?: ActivityEventItem[];
  usingMockActivity?: boolean;
  showAvatarMockLabel?: boolean;
  showNotificationsMockLabel?: boolean;
};

export function AppShell({
  children,
  compactHeader,
  headerProfile,
  recentActivity,
  usingMockActivity,
  showAvatarMockLabel,
  showNotificationsMockLabel,
}: AppShellProps) {
  return (
    <div className="h-[100dvh] overflow-hidden bg-soft-cloud">
      <AppSidebar />
      <div className="flex h-full min-w-0 flex-col lg:pl-56">
        <AppHeader
          compact={compactHeader}
          className="shrink-0"
          profile={headerProfile}
          recentActivity={recentActivity}
          usingMockActivity={usingMockActivity}
          showAvatarMockLabel={showAvatarMockLabel}
          showNotificationsMockLabel={showNotificationsMockLabel}
        />
        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
          {children}
        </div>
      </div>
      <AppBottomNav />
    </div>
  );
}
