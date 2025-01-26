import { NotificationType } from "@/constants/notification.constants";

export type TNotification = {
  _id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  redirectUrl: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TNotificationPayload = Omit<
  Notification,
  "id" | "isRead" | "createdAt" | "updatedAt"
>;
