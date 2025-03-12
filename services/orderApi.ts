import axiosInstance from '@/configs/axiosInstance';
import { IOrder, IOrderItem, IOrderList } from '@/interfaces/order-interface';
import { AxiosResponse } from 'axios';

export interface OrderApiParams {
  fields?: string;
}

export const orderApi = {
  getOrderList: async (
    params: OrderApiParams
  ): Promise<AxiosResponse<IOrderList>> => {
    try {
      return await axiosInstance.get('/store/orders', {
        params: { fields: params.fields || '' },
      });
    } catch (error) {
      console.error('Error fetching order list:', error);
      throw error;
    }
  },

  getOrderDetail: async (id: string): Promise<AxiosResponse<IOrder>> => {
    try {
      return await axiosInstance.get(`/store/orders/${id}`);
    } catch (error) {
      console.error('Error fetching order detail:', error);
      throw error;
    }
  },
};
