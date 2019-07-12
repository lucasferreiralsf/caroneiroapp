import * as mongoose from 'mongoose';

export const PassengersSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    tripId: {
      type: 'ObjectId',
      ref: 'Trips',
      required: true,
    },
    passengerIsConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
