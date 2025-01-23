import jwt from 'jsonwebtoken';
import { TJwtPayload } from './auth.types';
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

export const generateToken = (
  payload: TJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};
