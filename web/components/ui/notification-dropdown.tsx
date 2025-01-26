import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import NotificationCard from "@/components/ui/notification-card";
import NotificationLoader from "@/components/ui/notification-loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TNotification } from "@/types";
import { useRouter } from "next/navigation";
import type React from "react";

interface NotificationDropdownProps {
  notifications: TNotification[];
  isLoading: boolean;
  isError: boolean;
  onViewAll: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  isLoading,
  isError,
  onViewAll,
}) => {
  const router = useRouter();

  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <NotificationLoader key={i} />
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <div className="p-4 text-center text-red-500">
        <p>Something went wrong!</p>
      </div>
    );
  } else if (notifications.length === 0) {
    content = (
      <div className="p-4">
        <Empty title="notifications" />
      </div>
    );
  } else {
    content = (
      <ScrollArea className="h-[300px]">
        <div className="space-y-2 p-4">
          {notifications.slice(0, 5).map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              onClick={() => router.push(notification.redirectUrl)}
            />
          ))}
        </div>
      </ScrollArea>
    );
  }

  return (
    <div className="w-80 bg-background rounded-md shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            Unread all
          </Button>
        </div>
      </div>
      <Separator />
      {content}
    </div>
  );
};
