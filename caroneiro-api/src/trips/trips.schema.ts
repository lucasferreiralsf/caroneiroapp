import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

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
    tripOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    tripPassengers: [
      {
        passenger: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
        hasConfirmed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true },
);

TripSchema.plugin(mongoosePaginate);
