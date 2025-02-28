import { authApi } from '@/services/authApi';
import { IUserLogin, IUserRegister } from '@/interfaces/user-interface';
import {
  clearAuthLocalStorage,
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from '@/utils/authUtils';
import { create } from 'zustand';
import { SliceInterface } from '@/configs/store';

export interface AuthSlice {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setAuthenticated: (isAuthenticated: boolean) => void;
  // signup: (credentials: IUserRegister) => Promise<void>;
  login: (credentials: IUserLogin) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const createAuthSlice: SliceInterface<AuthSlice> = (set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  /* signup: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.signup(credentials);
      set({ isAuthenticated: true });
    } catch (error: any) {
      set({ error: error.message || 'Signup failed' });
      throw new Error(error.message || 'Signup failed');
    } finally {
      set({ isLoading: false });
    }
  }, */
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authApi.login(credentials);
      await setTokenToLocalStorage(data.token);
      set({ token: data.token, isAuthenticated: true });
    } catch (error: any) {
      set({ error: error.message || 'Login failed' });
      throw new Error(error.message || 'Login failed');
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await authApi.logout();
      await clearAuthLocalStorage();
      set({ token: null, isAuthenticated: false });
    } catch (error: any) {
      set({ error: error.message || 'Logout failed' });
    } finally {
      set({ isLoading: false });
    }
  },
  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      const token = await getTokenFromLocalStorage();
      if (!token) {
        throw new Error('No token found');
      }
      set({ token, isAuthenticated: true });
    } catch (error: any) {
      set({ error: error.message || 'Failed to initialize auth' });
    } finally {
      set({ isLoading: false });
    }
  },
});
