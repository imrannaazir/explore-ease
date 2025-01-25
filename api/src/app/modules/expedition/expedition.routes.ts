import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../user/user.constants';
import ExpeditionControllers from './expedition.controllers';
import ExpeditionValidations from './expedition.validations';

const router = Router();

router.post(
  '/post',
  auth(Role.ADMIN),
  validateRequest(ExpeditionValidations.expeditionValidator),
  ExpeditionControllers.postExpedition,
);

const ExpeditionRoutes = router;
export default ExpeditionRoutes;
