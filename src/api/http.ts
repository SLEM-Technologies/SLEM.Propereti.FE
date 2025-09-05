import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

let accessTokenMemory: string | null = null;
let refreshTokenMemory: string | null = null;

export const tokenStore = {
  get access() {
    return accessTokenMemory || (typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') : null);
  },
  set access(value: string | null) {
    accessTokenMemory = value;
    if (typeof localStorage !== 'undefined') {
      if (value) localStorage.setItem('access_token', value);
      else localStorage.removeItem('access_token');
    }
  },
  get refresh() {
    return refreshTokenMemory || (typeof localStorage !== 'undefined' ? localStorage.getItem('refresh_token') : null);
  },
  set refresh(value: string | null) {
    refreshTokenMemory = value;
    if (typeof localStorage !== 'undefined') {
      if (value) localStorage.setItem('refresh_token', value);
      else localStorage.removeItem('refresh_token');
    }
  },
  clear() {
    accessTokenMemory = null;
    refreshTokenMemory = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }
};

function attachAuth(config: InternalAxiosRequestConfig) {
  const token = tokenStore.access;
  if (token) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
}

let isRefreshing = false;
let pendingQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: any) => void; }> = [];

async function refreshToken(instance: AxiosInstance) {
  if (isRefreshing) {
    return new Promise((resolve, reject) => pendingQueue.push({ resolve, reject }));
  }
  isRefreshing = true;
  try {
    const refreshToken = tokenStore.refresh;
    if (!refreshToken) throw new Error('No refresh token');
    const res = await instance.post('/api/v1/auth/refresh', { refreshToken });
    const newAccess = res.data?.accessToken || res.data?.token || res.data?.data?.token;
    const newRefresh = res.data?.refreshToken || tokenStore.refresh;
    if (!newAccess) throw new Error('No access token in refresh response');
    tokenStore.access = newAccess;
    if (newRefresh) tokenStore.refresh = newRefresh;
    pendingQueue.forEach(p => p.resolve(newAccess));
  } catch (err) {
    pendingQueue.forEach(p => p.reject(err));
    tokenStore.clear();
    if (typeof window !== 'undefined') {
      const current = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.replace(`/login?from=${current}`);
    }
    throw err;
  } finally {
    isRefreshing = false;
    pendingQueue = [];
  }
}

const http = axios.create({ baseURL });

http.interceptors.request.use(attachAuth);

http.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const original = error.config as any;
    const status = error.response?.status;
    if (status === 401 && !original?._retry) {
      original._retry = true;
      try {
        await refreshToken(http);
        return http(original);
      } catch (e) {
        throw e;
      }
    }
    return Promise.reject(error);
  }
);

export default http;