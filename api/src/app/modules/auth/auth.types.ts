import { TUser } from '../user/user.types';

export type TJwtPayload = Pick<TUser, 'fullName' | 'email' | 'id' | 'role'>;
export type TSignUpPayload = Pick<TUser, 'email' | 'fullName' | 'password'>;
export type TSignInPayload = Pick<TUser, 'email' | 'password'>;
