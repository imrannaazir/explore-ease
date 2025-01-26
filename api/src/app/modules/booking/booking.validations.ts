import { z } from 'zod';
import { BookingStatus } from './booking.constants';

const bookingValidator = z.object({
  body: z.object({
    seats: z.number(),
  }),
});
const updateBookingValidator = z.object({
  body: z.object({
    status: z.enum(Object.keys(BookingStatus) as [string]),
  }),
});
const BookingValidations = { bookingValidator, updateBookingValidator };
export default BookingValidations;
