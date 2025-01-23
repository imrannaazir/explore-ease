import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { verifyToken } from '../modules/auth/auth.utils';
import { Role, Status } from '../modules/user/user.constants';
import User from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRole: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // token
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Your are not authenticated.',
      );
    }

    const decoded = verifyToken(
      token as string,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    if (!decoded) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You are not authenticated.',
      );
    }

    // is user exist
    const isUserExist = await User.findOne({ email: decoded.email });

    if (!isUserExist) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Account not founded.');
    }
    if (isUserExist?.status === Status.BLOCKED) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Your account has been blocked!',
      );
    }
    if (isUserExist?.status === Status.PENDING) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Your is not verified!');
    }

    if (requiredRole.length > 0 && !requiredRole?.includes(decoded?.role)) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Access denied.');
    }

    // set user in req
    req.user = isUserExist;
    next();
  });
};

export default auth;
