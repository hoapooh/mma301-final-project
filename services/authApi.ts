import axiosInstance from '@/configs/axiosInstance';
import {
  IAddressUpdate,
  IUser,
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
      );

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

  signup: async (data: IUserRegister): Promise<IUserResponse> => {
    try {
      // 1. Obtain JWT token
      const registerResponse = await axiosInstance.post(
        '/auth/customer/emailpass/register',
        {
          email: data.email,
          password: data.password,
        }
      );

      // 2. Extract token from response
      const token = registerResponse.data.token as string;

      // 3. Create new user
      const customerResponse = await axiosInstance.post(
        '/store/customers',
        {
          email: data.email,
          first_name: data.firstName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return customerResponse.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Registration failed');
      }

      throw error;
    }
  },

  /* logout: async (): Promise<void> => {
    await axiosInstance.delete('/auth/session');
  }, */

  getCurrentUser: async (): Promise<IUser> => {
    try {
      const response = await axiosInstance.get('/store/customers/me');
      return response.data;
    } catch (error) {
      // Add specific error handling
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to get user');
      }
      throw error;
    }
  },

  createAddress: async (data: {
    first_name: string;
    last_name: string;
    phone: string;
    address_name: string;
  }): Promise<IUser> => {
    try {
      const response = await axiosInstance.post(
        '/store/customers/me/addresses',
        { ...data, is_default_shipping: true, is_default_billing: true }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Failed to create address'
        );
      }
      throw error;
    }
  },

  updateAddress: async (addressId: string, addressData: IAddressUpdate) => {
    try {
      const response = await axiosInstance.post(
        `/store/customers/me/addresses/${addressId}`,
        addressData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Failed to update address'
        );
      }
      throw error;
    }
  },

  deleteAddress: async (addressId: string): Promise<IUser> => {
    try {
      const response = await axiosInstance.delete(
        `/store/customers/me/addresses/${addressId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Failed to delete address'
        );
      }
      throw error;
    }
  },
};
