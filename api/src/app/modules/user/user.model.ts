import { model, Schema } from 'mongoose';
import { Role, Status } from './user.constants';
import { TUser } from './user.types';

const userSchema = new Schema<TUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: Object.keys(Role),
      default: Role.USER,
    },
    status: {
      type: String,
      enum: Object.keys(Status),
      default: Status.PENDING,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = model<TUser>('user', userSchema);
export default User;
