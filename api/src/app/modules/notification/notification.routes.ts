import { Router } from 'express';
import { getIo } from '../../../socket';
import auth from '../../middlewares/auth';
import NotificationControllers from './notification.controllers';

const router = Router();
router.post('/fire', (req, res) => {
  const io = getIo();

  const x = io.emit('fire');

  io.emit('newNotification', 'blah');

  res.status(200).send({ message: 'fired' });
});
router.get(
  '/me/get-all',
  auth(),
  NotificationControllers.getAllMyNotifications,
);

router.patch(
  '/mark-as-read',
  auth(),
  NotificationControllers.markAllNotificationRead,
);

router.delete(
  '/delete/:notificationId',
  auth(),
  NotificationControllers.deleteNotificationById,
);
const NotificationRoutes = router;
export default NotificationRoutes;
