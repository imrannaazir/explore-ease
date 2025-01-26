import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import BookingServices from './booking-services';

const bookExpedition = catchAsync(async (req, res) => {
  const userId = req.user?._id;
  const expeditionId = req.params.id;
  const { seats } = req.body;

  const result = await BookingServices.bookExpedition(
    expeditionId,
    seats,
    userId,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'You have successfully booked.',
    data: result,
  });
});

const BookingControllers = { bookExpedition };
export default BookingControllers;
