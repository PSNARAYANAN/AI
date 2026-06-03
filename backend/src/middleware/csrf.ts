import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  // Simple CSRF protection for demonstration
  // In production, use a library like 'csurf' or modern 'double submit cookie' pattern
  const csrfToken = req.headers['x-csrf-token'];
  const cookieToken = req.cookies['csrfToken'];

  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    if (!csrfToken || csrfToken !== cookieToken) {
      return res.status(403).json({ error: 'Invalid CSRF token' });
    }
  }

  // Set new token if not present
  if (!cookieToken) {
    const newToken = crypto.randomBytes(32).toString('hex');
    res.cookie('csrfToken', newToken, {
      httpOnly: false, // Must be readable by client to send in header
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }

  next();
};
