import { describe, it, expect, vi } from 'vitest';
import { authenticate } from './auth';

describe('Auth Middleware', () => {
  it('should return 401 if no token is provided', () => {
    const req = {
      cookies: {},
      headers: {}
    } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as any;
    const next = vi.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized: No token provided' });
  });
});
