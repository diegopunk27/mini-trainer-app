import { promiseDelay } from '@common/utils/helpers';
import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { trackPromise } from 'react-promise-tracker';

let accessToken: string | null = null;
let refreshInFlight: Promise<string | null> | null = null;

export const setAccessToken = (token: string | null): void => {
  accessToken = token;
};

export const getToken = (): string => accessToken ?? '';

export const clearAuthenticationKeys = (): void => {
  accessToken = null;
  localStorage.removeItem('user');
};

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const isRefreshRequest = (url?: string): boolean => (url ?? '').includes('/auth/refresh');

export const refreshAccessToken = async (
  requestRefresh: () => Promise<string | null> = requestRefreshFromApi,
): Promise<string | null> => {
  if (!refreshInFlight) {
    refreshInFlight = requestRefresh().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
};

const requestRefreshFromApi = async (): Promise<string | null> => {
  const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
  const response = await axios.post(`${apiBaseUrl}/auth/refresh`, {}, { withCredentials: true });
  const token = response.data?.accessToken ?? response.data?.token ?? null;
  if (!token) return null;
  setAccessToken(token);
  return token;
};

export const handleUnauthorized = async (
  error: AxiosError,
  deps: {
    refresh: () => Promise<string | null>;
    retry: (config: RetryableConfig) => Promise<unknown>;
    onLogout: () => void;
  },
): Promise<unknown> => {
  const config = error.config as RetryableConfig | undefined;
  if (error.response?.status !== 401 || !config || config._retry || isRefreshRequest(config.url)) {
    throw error;
  }
  config._retry = true;
  const token = await deps.refresh();
  if (!token) {
    deps.onLogout();
    throw error;
  }
  config.headers.set('Authorization', `Bearer ${token}`);
  return deps.retry(config);
};

const client = axios.create();

client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(undefined, (error: AxiosError) =>
  handleUnauthorized(error, {
    refresh: () => refreshAccessToken(),
    retry: (config) => client.request(config),
    onLogout: clearAuthenticationKeys,
  }),
);

const buildFullUrl = (url: string, baseURL?: string): string => {
  const apiBaseUrl = baseURL || import.meta.env.VITE_API_URL || '';
  return `${apiBaseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
};

export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
  useTrack = true,
  delayMs = 0,
  baseURL?: string,
): Promise<T> => {
  const request = client.get<T>(buildFullUrl(url, baseURL), config);
  const response = await (useTrack ? trackPromise(request) : request);

  if (delayMs > 0) {
    await (useTrack ? trackPromise(promiseDelay(delayMs)) : promiseDelay(delayMs));
  }

  return response.data;
};

export const postData = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
  useTrack = true,
  baseURL?: string,
): Promise<T> => {
  const request = client.post<T>(buildFullUrl(url, baseURL), data, config);
  const response = useTrack ? await trackPromise(request) : await request;
  return response.data;
};

export const putData = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
  useTrack = true,
  baseURL?: string,
): Promise<T> => {
  const request = client.put<T>(buildFullUrl(url, baseURL), data, config);
  const response = useTrack ? await trackPromise(request) : await request;
  return response.data;
};

export const deleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
  useTrack = true,
  baseURL?: string,
): Promise<T> => {
  const request = client.delete<T>(buildFullUrl(url, baseURL), config);
  const response = useTrack ? await trackPromise(request) : await request;
  return response.data;
};

export const patchData = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
  useTrack = true,
  baseURL?: string,
): Promise<T> => {
  const request = client.patch<T>(buildFullUrl(url, baseURL), data, config);
  const response = useTrack ? await trackPromise(request) : await request;
  return response.data;
};

export const getBlobData = async (
  url: string,
  config?: AxiosRequestConfig,
  useTrack = true,
  baseURL?: string,
): Promise<Blob> => {
  const isAbsoluteUrl = /^https?:\/\//i.test(url);
  const fullUrl = isAbsoluteUrl ? url : buildFullUrl(url, baseURL);
  const request = client.get<Blob>(fullUrl, { ...config, responseType: 'blob' });
  const response = useTrack ? await trackPromise(request) : await request;
  return response.data;
};
