import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.routes';
import BookingRoutes from '../modules/booking/booking.routes';
import ExpeditionRoutes from '../modules/expedition/expedition.routes';
import NotificationRoutes from '../modules/notification/notification.routes';

const router = Router();

type TRouteModule = {
  path: string;
  route: Router;
};

const routerModules: TRouteModule[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/expeditions',
    route: ExpeditionRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/notifications',
    route: NotificationRoutes,
  },
];

routerModules.forEach((routerModule) => {
  router.use(routerModule.path, routerModule.route);
});
export default router;
