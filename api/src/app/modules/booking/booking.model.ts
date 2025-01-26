import { model, now, Schema } from 'mongoose';
import { BookingStatus } from './booking.constants';
import { TBooking } from './booking.types';

const BookingSchema = new Schema<TBooking>(
  {
    userId: { type: String, required: true },
    expeditionId: { type: String, required: true },
    seatCount: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.PENDING,
    },
    bookingDate: { type: Date, required: true, default: now() },
  },

  {
    timestamps: true,
  },
);

const Booking = model<TBooking>('Booking', BookingSchema);

export default Booking;
