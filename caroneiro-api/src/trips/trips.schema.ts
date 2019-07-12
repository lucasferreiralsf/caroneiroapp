import * as mongoose from 'mongoose';

export const TripSchema = new mongoose.Schema(
  {
    tripName: {
      type: String,
      required: true,
      trim: true,
    },
    tripDate: {
      type: Date,
      required: true,
    },
    tripCost: {
      type: Number,
      required: true,
    },
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
