import { describe, it, expect, vi } from 'vitest';
import api from './api';
import axios from 'axios';

vi.mock('axios', () => {
  const mockAxios = {
    create: vi.fn(() => mockAxios),
    interceptors: {
      request: { use: vi.fn(), eject: vi.fn() },
      response: { use: vi.fn(), eject: vi.fn() },
    },
    get: vi.fn(),
    post: vi.fn(),
    defaults: { headers: { common: {} } }
  };
  return { default: mockAxios };
});

describe('API Utility', () => {
  it('should be defined', () => {
    expect(api).toBeDefined();
  });

  it('should add x-csrf-token header if cookie exists', () => {
    const config = { headers: {} };
    // We are in jsdom environment now
    document.cookie = 'csrfToken=test-token; otherCookie=value';

    // Get the request interceptor that was registered during 'api' import
    const requestUseMock = axios.create().interceptors.request.use as any;
    const interceptor = requestUseMock.mock.calls[0][0];

    const result = interceptor(config);

    expect(result.headers['x-csrf-token']).toBe('test-token');
  });
});
