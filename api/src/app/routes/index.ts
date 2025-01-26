import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.routes';
import BookingRoutes from '../modules/booking/booking.routes';
import ExpeditionRoutes from '../modules/expedition/expedition.routes';

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
];

routerModules.forEach((routerModule) => {
  router.use(routerModule.path, routerModule.route);
});
export default router;
