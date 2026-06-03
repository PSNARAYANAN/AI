import { Router } from 'express';
import multer from 'multer';
import { scanFood, logMeal, scanLabel, getDailyLog } from '../controllers/foodController';
import { authenticate } from '../middleware/auth';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

router.post('/scan-food', authenticate, upload.single('image'), scanFood);
router.post('/log-meal', authenticate, logMeal);
router.post('/scan-label', authenticate, upload.single('image'), scanLabel);
router.get('/daily-log', authenticate, getDailyLog);

export default router;
