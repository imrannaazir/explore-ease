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
  '/sign-in',
  validateRequest(AuthValidations.signInValidator),
  AuthControllers.signIn,
);
router.post(
  '/verify-account',
  validateRequest(AuthValidations.verifyAccountValidator),
  AuthControllers.verifyAccount,
);

router.post(
  '/resend-verification-mail',
  validateRequest(AuthValidations.resendVerificationEmail),
  AuthControllers.resendVerificationEmail,
);
const AuthRoutes = router;
export default AuthRoutes;
