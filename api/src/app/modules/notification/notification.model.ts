import mongoose, { model, Schema } from 'mongoose';
import { TNotification } from './notification.types';

const notificationSchema = new Schema<TNotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      required: false,
      default: false,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

const Notification = model<TNotification>('notification', notificationSchema);

export default Notification;
