import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import NotificationServices from './notification.services';

const getAllMyNotifications = catchAsync(async (req, res) => {
  const userId = req.user?._id;
  const result = await NotificationServices.getAllMyNotifications(
    userId!,
    req.query,
  );
  sendResponse(res, {
    success: true,
    message: 'Notification sent successfully.',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const markAllNotificationRead = catchAsync(async (req, res) => {
  const userId = req.user?._id;
  const result = await NotificationServices.markAllNotificationRead(userId!);
  sendResponse(res, {
    success: true,
    message: 'Notifications marked read successfully.',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const deleteNotificationById = catchAsync(async (req, res) => {
  const userId = req.user?._id;
  const notificationId = req.params.notificationId;
  const result = await NotificationServices.deleteNotificationById(
    userId!,
    notificationId,
  );
  sendResponse(res, {
    success: true,
    message: 'Notifications deleted successfully.',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const NotificationControllers = {
  getAllMyNotifications,
  markAllNotificationRead,
  deleteNotificationById,
};
export default NotificationControllers;
