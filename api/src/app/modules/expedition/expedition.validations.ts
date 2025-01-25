import { z } from 'zod';

const expeditionValidator = z.object({
  body: z.object({
    name: z.string(),
    destination: z.string(),
    description: z.string(),
    totalSeats: z.number(),
    departureDate: z.coerce.date(),
    returnDate: z.coerce.date(),
    price: z.number().positive(),
  }),
});

const ExpeditionValidations = {
  expeditionValidator,
};

export default ExpeditionValidations;
