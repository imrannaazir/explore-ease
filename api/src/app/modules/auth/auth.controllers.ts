import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { cookieOptions } from './auth-constants';
import AuthServices from './auth.services';

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
const resentVerifyEmail = catchAsync(async (req, res) => {});
const refreshAccessToken = catchAsync(async (req, res) => {});

const AuthControllers = {
  singUp,
  signIn,
  verifyAccount,
  resentVerifyEmail,
  refreshAccessToken,
};

export default AuthControllers;
