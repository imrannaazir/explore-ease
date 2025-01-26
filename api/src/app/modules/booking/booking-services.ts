import { StatusCodes } from 'http-status-codes';
import mongoose, { now } from 'mongoose';
import AppError from '../../errors/AppError';
import Expedition from '../expedition/expedition.model';
import { Role } from '../user/user.constants';
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
    console.log(error, 'here');

    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to book expedition.',
    );
  }
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

  console.log({
    bookingId,
    status,
    role,
  });

  const updatedBookings = await Booking.updateOne(
    { _id: bookingId },
    { status },
  );
  return updatedBookings;
};

const BookingServices = {
  bookExpedition,
  getAllMyBookedExpeditions,
  getAllBookedExpeditions,
  updateBooking,
};
export default BookingServices;
