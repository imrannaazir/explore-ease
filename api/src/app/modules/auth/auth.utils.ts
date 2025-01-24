import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TJwtPayload } from './auth.types';

export const verifyToken = async (token: string, secret: string) => {
  try {
    return (await jwt.verify(token, secret)) as TJwtPayload;
  } catch (error) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid token');
  }
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

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = bcrypt.hash(password, Number(config.salt_rounds));
    return hashedPassword;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to hash password',
    );
  }
};

export const comparePassword = (password: string, hashedPassword: string) => {
  try {
    const isPasswordMatched = bcrypt.compare(password, hashedPassword);
    return isPasswordMatched;
  } catch (error) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized access.');
  }
};
