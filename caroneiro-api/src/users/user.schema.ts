import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

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
      required: true,
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
      // validate: // todo colocar um validador de email regex
    },
    password: {
      type: String,
      required: true,
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
    },
    facebookId: {
      type: String,
    },
    passengerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Passengers',
    },
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

export { UsersSchema };
