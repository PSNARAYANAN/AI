import { describe, it, expect, vi } from 'vitest';
import { csrfProtection } from './csrf';

describe('CSRF Middleware', () => {
  it('should set a csrfToken cookie if not present', () => {
    const req = {
      cookies: {},
      headers: {},
      method: 'GET'
    } as any;
    const res = {
      cookie: vi.fn(),
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as any;
    const next = vi.fn();

    csrfProtection(req, res, next);

    expect(res.cookie).toHaveBeenCalledWith('csrfToken', expect.any(String), expect.any(Object));
    expect(next).toHaveBeenCalled();
  });

  it('should return 403 on state-changing requests if token is missing', () => {
    const req = {
      cookies: { csrfToken: 'valid-token' },
      headers: {},
      method: 'POST'
    } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as any;
    const next = vi.fn();

    csrfProtection(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid CSRF token' });
  });
});
