import axios, { isCancel, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface AuthRequestConfig extends InternalAxiosRequestConfig {
  requiredAuth?: boolean;
}

api.interceptors.request.use((config: AuthRequestConfig) => {
  if (config.requiredAuth) {
    const token = import.meta.env.VITE_API_TOKEN;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    if (isCancel(error)) {
      return Promise.reject(new DOMException('Request aborted', 'AbortError'));
    }

    if (error?.response) {
      return Promise.reject(new Error(error.response.data?.message ?? 'ServerError'));
    }

    if (error.request) {
      return Promise.reject(new Error('NetworkError'));
    }

    return Promise.reject(new Error('UnknownError'));
  }
);

export default api;
