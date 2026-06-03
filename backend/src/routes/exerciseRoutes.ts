import { Router } from 'express';
import { getExercises, getExerciseById, saveExercise, getSavedExercises } from '../controllers/exerciseController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', getExercises);
router.get('/saved', authenticate, getSavedExercises);
router.get('/:id', getExerciseById);
router.post('/save', authenticate, saveExercise);

export default router;
