import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ObjectID } from 'bson';

interface IUser extends mongoose.Document {
  id?: ObjectID;
  firstName: string;
  lastName: string;
  primaryPhoneNumber: number;
  secondaryPhoneNumber?: number;
  email: string;
  password?: string;
  ownerTrips?: [ObjectID];
  tripsAsPassenger?: [ObjectID];
  emailIsVerified?: boolean;
  primaryPhoneNumberIsVerified?: boolean;
  googleId?: string;
  facebookId?: string;
  passengerId?: ObjectID;
  fullName?: () => string;
}

class UserModel extends mongoose.Model {
  id?: ObjectID;
  firstName: string;
  lastName: string;
  primaryPhoneNumber: number;
  secondaryPhoneNumber?: number;
  email: string;
  password?: string;
  ownerTrips?: [ObjectID];
  tripsAsPassenger?: [ObjectID];
  emailIsVerified?: boolean;
  primaryPhoneNumberIsVerified?: boolean;
  googleId?: string;
  facebookId?: string;
  passengerId?: ObjectID;
}

const UsersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 70,
    },
    primaryPhoneNumber: {
      type: Number,
      trim: true,
    },
    secondaryPhoneNumber: {
      type: Number,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 4,
      maxlength: 84,
      match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    },
    password: {
      type: String,
      trim: true,
      select: false,
    },
    emailIsVerified: {
      type: Boolean,
      default: false,
    },
    primaryPhoneNumberIsVerified: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
      unique: true,
    },
    facebookId: {
      type: String,
      unique: true,
    },
    ownerTrips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trips',
      },
    ],
    tripsAsPassenger: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trips',
      },
    ],
  },
  { timestamps: true },
);

UsersSchema.pre('save', async function(next) {
  const user: any = this;

  if (!user.isModified('password')) {
    return next();
  }

  user.password = await bcrypt.hash(user.password, 12);
  next();
});

UsersSchema.methods = {
  fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  },
};

export { UsersSchema, IUser, UserModel };
