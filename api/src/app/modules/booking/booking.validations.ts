import { z } from 'zod';

const bookingValidator = z.object({
  body: z.object({
    seats: z.number(),
  }),
});

const BookingValidations = { bookingValidator };
export default BookingValidations;
