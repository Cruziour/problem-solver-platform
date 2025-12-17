import { Router } from 'express';
import {
  login,
  logout,
  resendOtp,
  signup,
  validateOtp,
} from '../controllers/user.controller.js';
import verifyJwt from '../middlewares/auth.middleware.js';

const router = Router();

// Unsecure routes
router.route('/').post(login);
router.route('/signup').post(signup);
router.route('/validateOtp').post(validateOtp);
router.route('/resend-otp').post(resendOtp);

// secure routes
router.route('/logout').get(verifyJwt, logout);

export default router;
