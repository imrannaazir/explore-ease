import { Role, Status } from "@/constants/user.constants";
import { signInValidator, signUpValidator } from "@/schemas";
import { z } from "zod";

export type TUser = {
  _id: string;
  fullName: string;
  email: string;
  role: Role;
  status: Status;
  password: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TJwtPayload = {
  email: string;
  id: string;
  fullName: string;
  role: Role;
  iat: number;
  exp: number;
};

export type TSignUpProps = z.infer<typeof signUpValidator>;
export type TSignInProps = z.infer<typeof signInValidator>;
