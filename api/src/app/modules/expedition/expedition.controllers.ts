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

const getAllExpeditions = catchAsync(async (req, res) => {
  const result = await ExpeditionServices.getAllExpeditions(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    data: result?.data,
    meta: result?.meta,
    message: 'Retrieved all expeditions.',
  });
});
const ExpeditionControllers = { postExpedition, getAllExpeditions };
export default ExpeditionControllers;
