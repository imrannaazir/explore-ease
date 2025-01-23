import { model, Schema } from 'mongoose';
import { Role, Status } from './user.constants';
import { TUser } from './user.types';

const userSchema = new Schema<TUser>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    enum: Object.keys(Role),
    default: Role.USER,
  },
  status: {
    enum: Object.keys(Status),
    default: Status.PENDING,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = model<TUser>('user', userSchema);
export default User;
