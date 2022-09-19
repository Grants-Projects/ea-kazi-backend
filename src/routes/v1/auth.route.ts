import express, { Router, Application } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { AuthController } from '../../controller/auth.controller';
import authMiddleware from '../../middleware/auth.middleware';
import AuthValidator from '../../validators/user-entity.validator';
const authController: any = container.resolve(AuthController);
const authValidator: any = container.resolve(AuthValidator);

router.post(
  '/register',
  authValidator.registerUserEntity,
  authController.registerUser
);
router.post('/login', authValidator.loginUserEntity, authController.loginUser);
router.post(
  '/resend-verify',
  authValidator.resendAccountActivationEmail,
  authController.resendAccountActivationEmail
);
router.put(
  '/verify-account',
  authValidator.accountActivation,
  authController.accountActivation
);
router.get(
  '/forgot-password',
  authValidator.forgotPassword,
  authController.forgotPassword
);
router.put(
  '/reset-password',
  authValidator.resetPassword,
  authController.resetPassword
);

router.get('/logout', authMiddleware, authController.logoutHandler);

router.get('/secureurl', authMiddleware, authController.secureurl);

export default router;
