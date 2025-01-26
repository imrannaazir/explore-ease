import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import baseApi from "@/redux/base-api";
import { selectUser } from "@/redux/features/auth/slice";
import {
  useGetAllNotificationsQuery,
  useMarkNotificationsReadMutation,
} from "@/redux/features/notification/api";
import {
  resetUnreadCount,
  selectNotificationState,
  setUnreadCount,
} from "@/redux/features/notification/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { store } from "@/redux/store";
import { TagTypes } from "@/redux/tag-types";
import { TNotification } from "@/types";
import { BellIcon } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { NotificationDropdown } from "./notification-dropdown";

export const NotificationBell: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, isFetching, isError } = useGetAllNotificationsQuery("");
  const [markRead] = useMarkNotificationsReadMutation();
  const { unreadCount } = useAppSelector(selectNotificationState);
  const { user } = useAppSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);

  const socket = useMemo(
    () =>
      io(process.env.NEXT_PUBLIC_BASE_API_SOCKET, {
        withCredentials: true,
      }),
    []
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("User connected: ", socket.id);
    });

    if (user?.id) {
      socket.emit("join", user.id);

      socket.on("newNotification", () => {
        store.dispatch(baseApi.util.invalidateTags([TagTypes.NOTIFICATION]));
      });
    }

    return () => {
      socket.off("newNotification");
    };
  }, [socket, user]);

  useEffect(() => {
    const notifications = (data?.data?.data || []) as TNotification[];
    const unreadNotifications = notifications?.filter(
      (notification) => !notification.isRead
    );
    dispatch(setUnreadCount(unreadNotifications?.length));
  }, [data?.data, dispatch]);

  const handleMarkAllRead = async () => {
    await markRead("");
    dispatch(resetUnreadCount());
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer">
          <BellIcon className="h-6 w-6 text-gray-600" />
          {isFetching && (
            <span className="absolute -top-1 -right-1 ">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              </span>
            </span>
          )}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <NotificationDropdown
          notifications={(data?.data?.data || []) as TNotification[]}
          isLoading={isFetching}
          isError={isError}
          onViewAll={handleMarkAllRead}
        />
      </PopoverContent>
    </Popover>
  );
};
