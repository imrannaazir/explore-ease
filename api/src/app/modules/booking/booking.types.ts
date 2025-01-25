import mongoose from 'mongoose';
import { BookingStatus } from './booking.constants';

export type TBooking = {
  _id: mongoose.Types.ObjectId;
  userId: string;
  expeditionId: string;
  seatCount: number;
  status: BookingStatus;
  bookingDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type TBookingInput = Omit<TBooking, '_id' | 'createdAt' | 'updatedAt'>;
