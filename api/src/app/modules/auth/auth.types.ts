import { TUser } from '../user/user.types';

export type TJwtPayload = Pick<TUser, 'email' | 'id' | 'role'>;
export type TSignUpPayload = Pick<TUser, 'email' | 'fullName' | 'password'>;
export type TSignInPayload = Pick<TUser, 'email' | 'password'>;
