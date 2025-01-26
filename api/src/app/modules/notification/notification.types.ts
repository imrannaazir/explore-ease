import mongoose from 'mongoose';
import { NotificationType } from './notification.constants';

export type TNotification = {
  _id: mongoose.Types.ObjectId;
  message: string;
  title: string;
  type: NotificationType;
  isRead: boolean;
  redirectUrl: string;
  senderId: string | mongoose.Types.ObjectId;
  receiverId: string | mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type TNotificationPayload = Omit<
  TNotification,
  '_id' | 'isRead' | 'createdAt' | 'updatedAt'
>;
