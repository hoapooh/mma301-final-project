import { IUser } from '@/interfaces/user-interface';
import {
  clearAuthLocalStorage,
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from '@/utils/authUtils';
import { SliceInterface } from '@/configs/store';

export interface AuthSlice {
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  // signup: (credentials: IUserRegister) => Promise<void>;
  setUserData: (user: IUser) => void;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const createAuthSlice: SliceInterface<AuthSlice> = (set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

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

  setUserData: (user) => {
    set({ user, isAuthenticated: true });
  },

  login: async (token) => {
    set({ isLoading: true, error: null });
    try {
      await setTokenToLocalStorage(token);
      set({ token: token, isAuthenticated: true });
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
      await clearAuthLocalStorage();
      set({ token: null, isAuthenticated: false, user: null });
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
