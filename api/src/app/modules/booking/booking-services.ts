import { StatusCodes } from 'http-status-codes';
import mongoose, { now } from 'mongoose';
import AppError from '../../errors/AppError';
import Expedition from '../expedition/expedition.model';
import { NotificationType } from '../notification/notification.constants';
import NotificationServices from '../notification/notification.services';
import { TNotificationPayload } from '../notification/notification.types';
import { Role } from '../user/user.constants';
import User from '../user/user.model';
import { BookingStatus } from './booking.constants';
import Booking from './booking.model';
const bookExpedition = async (
  expeditionId: string,
  seats: number,
  userId: string,
) => {
  const isExpeditionExist = await Expedition.findById(expeditionId);
  if (!isExpeditionExist?._id) {
    throw new AppError(StatusCodes.NOT_FOUND, 'NO expedition founded.');
  }

  if (isExpeditionExist?.availableSeats < 1) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No available seat founded');
  }

  if (isExpeditionExist?.availableSeats - seats < 0) {
    throw new AppError(StatusCodes.CONFLICT, 'Available seat limit exceeded.');
  }

  if (isExpeditionExist?.departureDate < now()) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'Expedition has already departed.',
    );
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  let result;
  try {
    result = await Booking.create(
      [
        {
          expeditionId,
          userId,
          seatCount: seats,
        },
      ],
      { session },
    );

    await Expedition.updateOne(
      { _id: expeditionId },
      { availableSeats: isExpeditionExist?.availableSeats - seats },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to book expedition.',
    );
  }

  const admin = await User.findOne({ role: Role.ADMIN });
  const user = await User.findOne({ _id: userId });

  const title = `New bookings!`;
  const message = `${user?.fullName} have just book a expedition.`;
  const notificationPayload: TNotificationPayload = {
    title,
    message,
    receiverId: admin?._id as mongoose.Types.ObjectId,
    senderId: userId,
    redirectUrl: '/admin/booking-list',
    type: NotificationType.BOOKED as NotificationType,
  };

  await NotificationServices.sendNotification(notificationPayload);
  return result;
};

const getAllMyBookedExpeditions = async (userId: string) => {
  const bookings = await Booking.find({
    userId,
  }).populate('expeditionId userId');

  return bookings;
};
const getAllBookedExpeditions = async () => {
  const bookings = await Booking.find().populate('expeditionId userId');

  return bookings;
};
const updateBooking = async (
  bookingId: string,
  status: BookingStatus,
  role: Role,
) => {
  const isBookingExist = await Booking.findById(bookingId);
  if (!isBookingExist?._id) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Booking not founded.');
  }

  if (role === Role.USER && status === BookingStatus.ACCEPTED) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'User is not allowed to accept bookings.',
    );
  }

  const updatedBooking = await Booking.updateOne(
    { _id: bookingId },
    { status },
  );

  if (updatedBooking?.modifiedCount) {
    const admin = await User.findOne({ role: Role.ADMIN });
    const user = await User.findOne({ _id: isBookingExist?.userId });
    let title: string;
    let message: string;
    let senderId: mongoose.Types.ObjectId;
    let receiverId;
    let redirectUrl: string;
    if (role === Role.ADMIN) {
      (receiverId = '/user/dashboard'), (senderId = admin?._id!);
      (receiverId = user?._id), (title = `Booking ${status?.toLowerCase()}!`);
      message = `Admin has ${status?.toLowerCase()} yor booking.`;
    } else {
      receiverId = '/admin/booking-list';
      receiverId = admin?._id!;
      (senderId = user?._id!), (title = `Booking ${status?.toLowerCase()}!`);
      message = `${user?.fullName} has ${status?.toLowerCase()} a booking.`;
    }
    const notificationPayload: TNotificationPayload = {
      title,
      message,
      receiverId: receiverId!,
      senderId: senderId!,
      redirectUrl: redirectUrl!,
      type:
        status === BookingStatus.ACCEPTED
          ? NotificationType.ACCEPTED
          : NotificationType.CANCELED,
    };

    await NotificationServices.sendNotification(notificationPayload);
  }
  return updatedBooking;
};

export const getBookingsPerMonth = async () => {
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setMonth(startDate.getMonth() - 11);

  const bookingsPerMonth = await Booking.aggregate([
    {
      $match: {
        bookingDate: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$bookingDate' },
          month: { $month: '$bookingDate' },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: {
          $dateFromParts: {
            year: '$_id.year',
            month: '$_id.month',
          },
        },
        count: 1,
      },
    },
    { $sort: { date: 1 } },
  ]);

  // Fill in missing months with zero bookings
  const filledBookingsPerMonth = [];
  for (let i = 0; i < 12; i++) {
    const currentDate = new Date(startDate);
    currentDate.setMonth(currentDate.getMonth() + i);
    const existingData = bookingsPerMonth.find(
      (b) =>
        b.date.getFullYear() === currentDate.getFullYear() &&
        b.date.getMonth() === currentDate.getMonth(),
    );
    filledBookingsPerMonth.push(
      existingData || {
        date: currentDate,
        count: 0,
      },
    );
  }

  return filledBookingsPerMonth;
};

const BookingServices = {
  bookExpedition,
  getAllMyBookedExpeditions,
  getAllBookedExpeditions,
  updateBooking,
  getBookingsPerMonth,
};
export default BookingServices;
