import axiosInstance from '@/configs/axiosInstance';
import { IProduct } from '@/interfaces/product-interface';

export const productApi = {
  getProducts: async (): Promise<IProduct> => {
    return await axiosInstance.get('/store/products');
  },
};
