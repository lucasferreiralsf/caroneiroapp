import * as mongoose from 'mongoose';

export const TripsOwnerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    trip: [
      {
        type: 'ObjectId',
        ref: 'Trips',
        required: true,
      },
    ],
  },
  { timestamps: true },
);
