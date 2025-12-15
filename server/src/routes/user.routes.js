import { Router } from 'express';
import { signup, validateOtp } from '../controllers/user.controller.js';

const router = Router();

router.route('/signup').post(signup);
router.route('/validateOtp').post(validateOtp);

export default router;
