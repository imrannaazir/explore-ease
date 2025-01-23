import { TUser } from '../user/user.types';

export type TJwtPayload = Pick<TUser, 'email' | 'id' | 'role'>;
