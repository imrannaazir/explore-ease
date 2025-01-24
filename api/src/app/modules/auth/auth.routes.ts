import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AuthControllers from './auth.controllers';
import AuthValidations from './auth.validations';

const router = Router();
router.post(
  '/sign-up',
  validateRequest(AuthValidations.signUpValidator),
  AuthControllers.singUp,
);

router.post(
  '/verify-account',
  validateRequest(AuthValidations.verifyAccountValidator),
  AuthControllers.verifyAccount,
);
const AuthRoutes = router;
export default AuthRoutes;
