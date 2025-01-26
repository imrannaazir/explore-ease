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

const updateBooking = catchAsync(async (req, res) => {
  const role = req.user?.role;
  const bookingId = req.params.id;
  const { status } = req.body;

  const result = await BookingServices.updateBooking(bookingId, status, role);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'You have successfully updated booking.',
    data: result,
  });
});

const getAllMyBookedExpeditions = catchAsync(async (req, res) => {
  const userId = req.user?._id;

  const result = await BookingServices.getAllMyBookedExpeditions(userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Your all booked expeditions retrieved.',
    data: result,
  });
});

const getAllBookedExpeditions = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookedExpeditions();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All booked expeditions retrieved.',
    data: result,
  });
});

const getBookingsPerMonth = catchAsync(async (req, res) => {
  const result = await BookingServices.getBookingsPerMonth();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Bookings per months retrieved.',
    data: result,
  });
});

const BookingControllers = {
  bookExpedition,
  getAllMyBookedExpeditions,
  updateBooking,
  getAllBookedExpeditions,
  getBookingsPerMonth,
};
export default BookingControllers;
