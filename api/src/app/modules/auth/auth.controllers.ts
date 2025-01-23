import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
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
const signIn = catchAsync(async (req, res) => {});
const verifyAccount = catchAsync(async (req, res) => {});
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
