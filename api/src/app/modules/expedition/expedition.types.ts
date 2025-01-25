import mongoose from 'mongoose';

export type TExpedition = {
  _id: mongoose.Types.ObjectId;
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

export type TExpeditionInput = Omit<
  TExpedition,
  '_id' | 'createdAt' | 'updatedAt' | 'availableSeats'
>;
