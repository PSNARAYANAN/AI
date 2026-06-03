import { Response } from 'express';
import { prisma } from '../index';
import { analyzeFoodImage, analyzeLabelImage } from '../services/geminiService';
import { AuthRequest } from '../middleware/auth';

export const scanFood = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const result = await analyzeFoodImage(req.file.buffer, req.file.mimetype);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to analyze food image' });
  }
};

export const logMeal = async (req: AuthRequest, res: Response) => {
  try {
    const { name, calories, protein, carbs, fat, fiber } = req.body;
    const userId = req.userId!;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let log = await prisma.dailyLog.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
    });

    if (!log) {
      log = await prisma.dailyLog.create({
        data: {
          userId,
          date: today,
        },
      });
    }

    const meal = await prisma.meal.create({
      data: {
        logId: log.id,
        name,
        calories,
        protein,
        carbs,
        fat,
        fiber,
      },
    });

    await prisma.dailyLog.update({
      where: { id: log.id },
      data: {
        caloriesConsumed: { increment: calories },
        protein: { increment: protein },
        carbs: { increment: carbs },
        fat: { increment: fat },
        fiber: { increment: fiber },
      },
    });

    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to log meal' });
  }
};

export const scanLabel = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const result = await analyzeLabelImage(req.file.buffer, req.file.mimetype);

    // Save to history
    await prisma.scannedProduct.create({
      data: {
        userId: req.userId!,
        name: result.name || 'Unknown Product',
        score: result.score,
        nutritionalInfo: result.nutritionalInfo,
        advice: result.advice,
      },
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze label image' });
  }
};

export const getDailyLog = async (req: AuthRequest, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const log = await prisma.dailyLog.findUnique({
      where: {
        userId_date: {
          userId: req.userId!,
          date: today,
        },
      },
      include: { meals: true },
    });
    res.status(200).json(log || { caloriesConsumed: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, meals: [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch daily log' });
  }
};
