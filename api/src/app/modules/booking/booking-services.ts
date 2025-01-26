import { StatusCodes } from 'http-status-codes';
import mongoose, { now } from 'mongoose';
import AppError from '../../errors/AppError';
import Expedition from '../expedition/expedition.model';
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
const BookingServices = { bookExpedition };
export default BookingServices;
