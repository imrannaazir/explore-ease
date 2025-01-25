import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { cookieOptions } from './auth-constants';
import AuthServices from './auth.services';

const getMe = catchAsync(async (req, res) => {
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Your data retrieved successfully.',
    data: req.user,
  });
});

const singUp = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthServices.singUp(payload);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Account created, please verify email.',
    data: result,
  });
});

const signIn = catchAsync(async (req, res) => {
  const payload = req.body;
  const { accessToken, refreshToken } = await AuthServices.signIn(payload);
  res.cookie('accessToken', accessToken, cookieOptions);
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Logged in successfully.',
    data: null,
  });
});

const signOut = catchAsync(async (req, res) => {
  res.cookie('accessToken', '', cookieOptions);
  res.cookie('refreshToken', '', cookieOptions);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Logged out successfully.',
    data: null,
  });
});

const verifyAccount = catchAsync(async (req, res) => {
  const { token } = req.body;
  await AuthServices.verifyAccount(token);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Your are verified, please login.',
    data: null,
  });
});

const resendVerificationEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  await AuthServices.resendVerificationEmail(email);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Resent your account verification email.',
    data: null,
  });
});

const refreshAccessToken = catchAsync(async (req, res) => {
  const token = req.cookies.refreshToken;
  const { accessToken, refreshToken } =
    await AuthServices.refreshAccessToken(token);

  res.cookie('accessToken', accessToken, cookieOptions);
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Retrieved refresh token successfully.',
    data: null,
  });
});

const AuthControllers = {
  singUp,
  signIn,
  verifyAccount,
  resendVerificationEmail,
  refreshAccessToken,
  getMe,
  signOut,
};

export default AuthControllers;
