import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ExpeditionServices from './expedition.services';

const postExpedition = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await ExpeditionServices.postExpedition(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    data: result,
    message: 'New expedition created successfully',
  });
});
const ExpeditionControllers = { postExpedition };
export default ExpeditionControllers;
