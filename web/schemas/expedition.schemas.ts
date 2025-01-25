import { z } from "zod";

export const expeditionSchema = z
  .object({
    name: z.string().min(2, {
      message: "Expedition name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    destination: z.string().min(2, {
      message: "Destination must be at least 2 characters.",
    }),
    departureDate: z.date({
      required_error: "Departure date is required.",
    }),
    returnDate: z.date({
      required_error: "Return date is required.",
    }),
    price: z.number().positive({
      message: "Price must be a positive number.",
    }),
    totalSeats: z.number().int().positive({
      message: "Total seats must be a positive integer.",
    }),
  })
  .refine((data) => data.departureDate < data.returnDate, {
    message: "Return date must be after departure date",
    path: ["returnDate"],
  });
