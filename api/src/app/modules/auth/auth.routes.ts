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
  validateRequest(AuthValidations.resendVerificationEmailValidator),
  AuthControllers.resendVerificationEmail,
);

router.post(
  '/refresh-access-token',
  validateRequest(AuthValidations.refreshAccessTokenValidator),
  AuthControllers.refreshAccessToken,
);
const AuthRoutes = router;
export default AuthRoutes;
