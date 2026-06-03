import { Router } from 'express';
import { register, login, logout, getProfile, onboarding } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authenticate, getProfile);
router.post('/onboarding', authenticate, onboarding);

export default router;
