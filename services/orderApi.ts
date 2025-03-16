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

  createPaymentCollection: async (
    cart_id: string
  ): Promise<
    AxiosResponse<{
      payment_collection: {
        id: string;
        amount: number;
      };
    }>
  > => {
    return await axiosInstance.post(`/store/payment-collections`, { cart_id });
  },

  initPaymentSession: async (paymentCollectionID: string) => {
    return await axiosInstance.post(
      `/store/payment-collections/${paymentCollectionID}/payment-sessions`,
      {
        provider_id: 'pp_system_default', // for testing
      }
    );
  },

  getShippingMethods: async (
    cart_id: string
  ): Promise<
    AxiosResponse<{ shipping_options: { id: string; name: string }[] }>
  > => {
    return await axiosInstance.get(`/store/shipping-options`, {
      params: { cart_id },
    });
  },


};
