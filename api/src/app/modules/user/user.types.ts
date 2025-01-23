import { Role, Status } from './user.constants';

export type TUser = {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  status: Status;
  password: string;
  isVerified: boolean;
  createdAt: Date;
  updated: Date;
};
