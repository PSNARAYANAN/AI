import { Response } from 'express';
import { prisma } from '../index';
import { MuscleGroup } from '@prisma/client';

export const getExercises = async (req: any, res: Response) => {
  try {
    const { muscleGroup, search } = req.query;

    const where: any = {};
    if (muscleGroup) {
      where.muscleGroup = muscleGroup as MuscleGroup;
    }
    if (search) {
      where.name = { contains: search as string, mode: 'insensitive' };
    }

    const exercises = await prisma.exercise.findMany({ where });
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getExerciseById = async (req: any, res: Response) => {
  try {
    const exercise = await prisma.exercise.findUnique({
      where: { id: req.params.id },
    });
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const saveExercise = async (req: any, res: Response) => {
  try {
    const { exerciseId } = req.body;
    const userId = req.userId;

    const saved = await prisma.savedExercise.create({
      data: {
        userId,
        exerciseId,
      },
    });

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSavedExercises = async (req: any, res: Response) => {
  try {
    const userId = req.userId;
    const saved = await prisma.savedExercise.findMany({
      where: { userId },
      include: { exercise: true },
    });
    res.status(200).json(saved.map(s => s.exercise));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
