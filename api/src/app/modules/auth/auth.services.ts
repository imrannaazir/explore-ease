import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import sendEmail, {
  getValidateMailContent,
  TEmailPayload,
} from '../../utils/send-mail';
import { Status } from '../user/user.constants';
import User from '../user/user.model';
import { TJwtPayload, TSignInPayload, TSignUpPayload } from './auth.types';
import {
  comparePassword,
  generateToken,
  hashPassword,
  verifyToken,
} from './auth.utils';

const singUp = async (payload: TSignUpPayload) => {
  payload.password = await hashPassword(payload?.password);
  const user = await User.create(payload);
  //@ts-ignore
  const { password: _, ...restUser } = user?._doc;
  const jwtPayload: TJwtPayload = {
    id: user?.id,
    email: user?.email,
    role: user?.role,
  };

  const verifyToken = generateToken(
    jwtPayload,
    config.jwt_verify_secret!,
    config?.jwt_verify_token_expires_in!,
  );

  const redirectUrl = `${config.client_url}/verification-account?token=${verifyToken}`;
  const emailPayload: TEmailPayload = {
    receiver: user?.email,
    subject: 'Activate your account.',
    html: getValidateMailContent({ redirectUrl }),
  };
  sendEmail(emailPayload);
  return restUser;
};

const signIn = async (payload: TSignInPayload) => {
  const isUserExist = await User.findOne(
    {
      email: payload?.email,
    },
    {
      password: 1,
    },
  );

  if (!isUserExist) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'Invalid one or more credentials.',
    );
  }

  const isPasswordMatched = await comparePassword(
    payload.password,
    isUserExist?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'Invalid one or more credentials.',
    );
  }

  if (
    isUserExist?.status === Status.PENDING ||
    isUserExist?.status === Status.BLOCKED
  ) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      `Your account is ${String(isUserExist?.status).toLowerCase()}.`,
    );
  }

  const jwtPayload: TJwtPayload = {
    email: isUserExist?.email,
    id: isUserExist?.id,
    role: isUserExist?.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret!,
    config.jwt_access_token_expires_in!,
  );
  const refreshToken = generateToken(
    jwtPayload,
    config?.jwt_refresh_secret!,
    config?.jwt_refresh_token_expires_in!,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const verifyAccount = async (token: string) => {
  const isTokenValid = (await verifyToken(
    token,
    config.jwt_verify_secret!,
  )) as TJwtPayload;
  if (!isTokenValid) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Token is invalid.');
  }

  const isUserExist = await User.findById(isTokenValid?.id);
  if (!isUserExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not registered.');
  }

  if (isUserExist.status === Status.BLOCKED) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'Your account has been blocked.',
    );
  }

  await User.findByIdAndUpdate(isUserExist?.id, {
    status: Status.ACTIVE,
    isVerified: true,
  });
};

const resentVerifyEmail = async () => {};

const refreshAccessToken = async () => {};

const AuthServices = {
  singUp,
  signIn,
  verifyAccount,
  resentVerifyEmail,
  refreshAccessToken,
};
export default AuthServices;
