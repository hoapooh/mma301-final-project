import axiosInstance from '@/configs/axiosInstance';
import { ICart } from '@/interfaces/cart-interface';
import { IProduct } from '@/interfaces/product-interface';
import { AxiosResponse } from 'axios';

export interface IAddCart {
  variant_id: string;
  quantity: number;
}

export const cartApi = {
  createCart: async (): Promise<AxiosResponse<{ cart: ICart }>> => {
    return await axiosInstance.post('/store/carts');
  },

  getCart: async (
    id: string | null
  ): Promise<AxiosResponse<{ cart: ICart }>> => {
    return await axiosInstance.get(`/store/carts/${id}`);
  },

  addLineItem: async (cartID: string | undefined, data: IAddCart) => {
    return await axiosInstance.post(`/store/carts/${cartID}/line-items`, data);
  },

  updateLineItem: async (
    cartID: string,
    lineItemID: string,
    q: number
  ): Promise<void> => {
    await axiosInstance.post(
      `/store/carts/${cartID}/line-items/${lineItemID}`,
      {
        quantity: q,
      }
    );
  },
  removeLineItem: async (cartID: string, lineItemID: string): Promise<void> => {
    await axiosInstance.delete(
      `/store/carts/${cartID}/line-items/${lineItemID}`
    );
  },
};
