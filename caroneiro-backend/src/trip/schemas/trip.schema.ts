import * as mongoose from 'mongoose';

export const TripSchema = new mongoose.Schema(
  {
    tripName: String,
    tripDate: Date,
    tripCost: Number,
    isSharingCost: {
      type: Boolean,
      default: false,
    },
    isRecurrent: {
      type: Boolean,
      default: false,
    },
    recurrenceTimes: {
      type: Number,
      default: 0,
    },
    recurrenceType: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'daily',
    },
  },
  { timestamps: true },
);
