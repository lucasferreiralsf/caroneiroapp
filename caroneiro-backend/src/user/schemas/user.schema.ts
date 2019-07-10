import * as mongoose from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

export const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    primaryPhoneNumber: Number,
    secondaryPhoneNumber: Number,
    email: String,
    password: String,
    emailIsVerified: {
      type: Boolean,
      default: false,
    },
    primaryPhoneNumberIsVerified: {
      type: Boolean,
      default: false,
    },
    googleId: String,
    facebookId: String,
    passengerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Passenger',
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.plugin(passportLocalMongoose);
