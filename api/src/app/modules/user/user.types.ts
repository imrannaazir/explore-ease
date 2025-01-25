import mongoose from 'mongoose';
import { Role, Status } from './user.constants';

export type TUser = {
  id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  role: Role;
  status: Status;
  password: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};
