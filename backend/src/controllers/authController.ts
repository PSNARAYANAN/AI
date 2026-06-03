import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';
import { z } from 'zod';
import { encrypt, decrypt } from '../utils/encryption';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name ? encrypt(name) : name,
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name ? decrypt(user.name) : user.name,
        goal: user.goal,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getProfile = async (req: any, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Decrypt sensitive data if needed (e.g., if we chose to encrypt weight)
    // For this implementation, we will encrypt 'name' as a demonstration of "at rest" encryption
    const decryptedUser = {
      ...user,
      name: user.name ? decrypt(user.name) : user.name,
      password: '', // Never return password
    };

    res.status(200).json(decryptedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const onboardingSchema = z.object({
  name: z.string(),
  goal: z.enum(['LOSE_WEIGHT', 'GAIN_WEIGHT']),
  currentWeight: z.number(),
  targetWeight: z.number(),
  height: z.number(),
  age: z.number(),
  gender: z.string(),
  activityLevel: z.enum(['SEDENTARY', 'LIGHTLY_ACTIVE', 'MODERATELY_ACTIVE', 'VERY_ACTIVE']),
});

export const onboarding = async (req: any, res: Response) => {
  try {
    const data = onboardingSchema.parse(req.body);

    // Encrypt sensitive info before storing
    const encryptedData = {
      ...data,
      name: encrypt(data.name),
    };

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: encryptedData,
    });

    res.status(200).json({
      ...user,
      name: data.name, // Return original name for immediate UI use
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
