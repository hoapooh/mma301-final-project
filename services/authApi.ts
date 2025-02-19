import axiosInstance from '@/configs/axiosInstance';
import {
  IUserLogin,
  IUserRegister,
  IUserResponse,
} from '@/interfaces/user-interface';
import axios from 'axios';

export const authApi = {
  login: async (credentials: IUserLogin): Promise<IUserResponse> => {
    try {
      const response = await axiosInstance.post(
        '/auth/customer/emailpass',
        credentials
        // {
        //   headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'POST',
        //     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        //   },
        // }
      );

      // Create session
      if (response.data.token) {
        await axiosInstance.post('/auth/session', null, {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
          // withCredentials: true,
        });
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          throw new Error('Access denied. Please check your credentials.');
        }
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw error;
    }
  },

  register: async (data: IUserRegister): Promise<IUserResponse> => {
    const response = await axiosInstance.post(
      '/auth/customer/emailpass/register',
      data
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.delete('/auth/session');
  },

  getCurrentUser: async (): Promise<IUserResponse> => {
    try {
      const response = await axiosInstance.get('/store/customers/me', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // Add specific error handling
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to get user');
      }
      throw error;
    }
  },
};
