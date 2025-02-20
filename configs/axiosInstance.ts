import axios from 'axios';
import {
  clearAuthLocalStorage,
  getTokenFromLocalStorage,
} from '@/utils/authUtils';

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://store-admin.pnviethung.dev';
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'x-publishable-api-key': API_KEY,
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getTokenFromLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await clearAuthLocalStorage();
      // Redirect to login
      // You might want to use router.replace('/auth/signin');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
