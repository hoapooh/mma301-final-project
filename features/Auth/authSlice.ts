import { SliceInterface } from '@/configs/store';
import { IUser, IUserLogin, IUserResponse } from '@/interfaces/user-interface';
import { authApi } from '@/services/authApi';
import {
  clearAuthLocalStorage,
  getTokenFromLocalStorage,
  getUserInfoFromLocalStorage,
  setTokenToLocalStorage,
  setUserInfoToLocalStorage,
} from '@/utils/authUtils';

export interface AuthSlice {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
  setAuth: (data: IUserResponse) => Promise<void>;
  login: (credentials: IUserLogin) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const createAuthSlice: SliceInterface<AuthSlice> = (set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),

  setAuth: async (data) => {
    await setTokenToLocalStorage(data.token);
    await setUserInfoToLocalStorage(data.user);
    set({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
      error: null,
    });
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authApi.login(credentials);
      await get().setAuth(data);
    } catch (error: any) {
      const message = error.message || 'Login failed';
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await authApi.logout();
      await clearAuthLocalStorage();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      });
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

      const currentUser = await authApi.getCurrentUser();
      await get().setAuth(currentUser);
    } catch (error) {
      // Clear auth on any error
      await get().logout();
    } finally {
      set({ isLoading: false });
    }
  },
});
