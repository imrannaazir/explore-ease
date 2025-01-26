import { TNotification } from "@/types";
import { formatDistanceToNow } from "date-fns";
import type React from "react";

interface NotificationCardProps {
  notification: TNotification;
  onClick?: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onClick,
}) => {
  return (
    <div
      className={`p-4 rounded-lg ${
        notification.isRead ? "bg-gray-100" : "bg-blue-50"
      } cursor-pointer hover:bg-gray-200 transition-colors`}
      onClick={onClick}
    >
      <h3 className="font-semibold">{notification.title}</h3>
      <p className="text-sm text-gray-600">{notification.message}</p>
      <p className="text-xs text-gray-400 mt-2">
        {formatDistanceToNow(new Date(notification.createdAt), {
          addSuffix: true,
        })}
      </p>
    </div>
  );
};

export default NotificationCard;
