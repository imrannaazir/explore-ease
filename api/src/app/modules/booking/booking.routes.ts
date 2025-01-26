import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../user/user.constants';
import BookingControllers from './booking.controllers';
import BookingValidations from './booking.validations';

const router = Router();

router.post(
  '/book/:id',
  auth(Role.USER),
  validateRequest(BookingValidations.bookingValidator),
  BookingControllers.bookExpedition,
);
router.post(
  '/update/:id',
  auth(),
  validateRequest(BookingValidations.updateBookingValidator),
  BookingControllers.updateBooking,
);
router.get(
  '/get-my',
  auth(Role.USER),
  BookingControllers.getAllMyBookedExpeditions,
);
router.get(
  '/get-all',
  auth(Role.ADMIN),
  BookingControllers.getAllBookedExpeditions,
);

const BookingRoutes = router;
export default BookingRoutes;
