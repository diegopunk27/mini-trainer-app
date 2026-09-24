import { AxiosError, AxiosHeaders } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  clearAuthenticationKeys,
  getToken,
  handleUnauthorized,
  refreshAccessToken,
  setAccessToken,
} from '@common/services/http/private-http.service';

describe('private http session', () => {
  beforeEach(() => {
    setAccessToken(null);
  });

  it('keeps the access token in memory', () => {
    setAccessToken('abc');
    expect(getToken()).toBe('abc');
    clearAuthenticationKeys();
    expect(getToken()).toBe('');
  });

  it('shares a single refresh call', async () => {
    const requestRefresh = vi.fn().mockResolvedValue('next');
    const [first, second] = await Promise.all([
      refreshAccessToken(requestRefresh),
      refreshAccessToken(requestRefresh),
    ]);
    expect(first).toBe('next');
    expect(second).toBe('next');
    expect(requestRefresh).toHaveBeenCalledOnce();
  });

  it('retries once after refresh and logs out if refresh fails', async () => {
    const retry = vi.fn().mockResolvedValue({ data: 'ok' });
    const onLogout = vi.fn();
    const config = { url: '/items', headers: new AxiosHeaders(), _retry: false };
    const error = { config, response: { status: 401 } } as unknown as AxiosError;

    await handleUnauthorized(error, {
      refresh: async () => 'fresh',
      retry,
      onLogout,
    });
    expect(retry).toHaveBeenCalledOnce();
    expect(onLogout).not.toHaveBeenCalled();

    await expect(
      handleUnauthorized(
        { ...error, config: { ...config, _retry: false } } as unknown as AxiosError,
        {
          refresh: async () => null,
          retry,
          onLogout,
        },
      ),
    ).rejects.toBeTruthy();
    expect(onLogout).toHaveBeenCalledOnce();
  });
});
