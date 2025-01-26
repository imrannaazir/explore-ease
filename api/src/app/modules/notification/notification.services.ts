import { getIo } from '../../../socket';
import QueryBuilder from '../../builder/QueryBuilder';
import Notification from './notification.model';
import { TNotificationPayload } from './notification.types';

const sendNotification = async (payload: TNotificationPayload) => {
  const notification = await Notification.create(payload);

  if (notification._id) {
    const io = getIo();

    io.emit('newNotification', notification);
  }
};

const getAllMyNotifications = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const notificationQueryModel = new QueryBuilder(
    Notification.find({
      receiverId: userId,
    }),
    query,
  )
    .filter()
    .fields()
    .sort()
    .paginate();

  const data = await notificationQueryModel.modelQuery;
  const meta = await notificationQueryModel.countTotal();
  return { data, meta };
};

const markAllNotificationRead = async (userId: string) => {
  const updatedNotifications = await Notification.updateMany(
    {
      receiverId: userId,
      isRead: false,
    },
    { isRead: true },
  );
  return updatedNotifications;
};

const deleteNotificationById = async (
  userId: string,
  notificationId: string,
) => {
  const deletedNotification = await Notification.deleteOne({
    id: notificationId,
    receiverId: userId,
  });

  return deletedNotification;
};

const NotificationServices = {
  sendNotification,
  getAllMyNotifications,
  markAllNotificationRead,
  deleteNotificationById,
};
export default NotificationServices;
