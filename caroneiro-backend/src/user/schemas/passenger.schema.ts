import * as mongoose from 'mongoose';
import { UserSchema } from './user.schema';
import { TripSchema } from '../../trip/schemas/trip.schema';

export const PassengerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },
  ],
});
