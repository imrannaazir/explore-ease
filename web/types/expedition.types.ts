import { expeditionSchema } from "@/schemas";
import { z } from "zod";

export type TExpedition = {
  _id: string;
  name: string;
  description: string;
  destination: string;
  departureDate: Date;
  returnDate: Date;
  duration: number;
  price: number;
  totalSeats: number;
  availableSeats: number;
  createdAt: Date;
  updatedAt: Date;
};
export type TExpeditionInput = z.infer<typeof expeditionSchema>;
