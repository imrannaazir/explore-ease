import { model, Schema } from 'mongoose';
import { TExpedition } from './expedition.types';

const expeditionSchema = new Schema<TExpedition>(
  {
    name: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: false,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date) {
          return this.departureDate < value;
        },
        message: 'Return date must be greater than departure date.',
      },
    },
    price: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save hook to calculate duration
expeditionSchema.pre('save', function (next) {
  if (this.departureDate && this.returnDate) {
    const durationInMilliseconds =
      this.returnDate.getTime() - this.departureDate.getTime();
    this.duration = Math.ceil(durationInMilliseconds / (1000 * 60 * 60 * 24));
  }
  next();
});

const Expedition = model<TExpedition>('expedition', expeditionSchema);
export default Expedition;
