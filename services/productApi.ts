import axiosInstance from '@/configs/axiosInstance';
import { IProduct } from '@/interfaces/product-interface';
import { AxiosResponse } from 'axios';

export interface ProductApiParams {
  fields?: string;
  regionID?: string | null;
  q?: string | null;
}

export const productApi = {
  getProducts: async (
    params: ProductApiParams
  ): Promise<
    AxiosResponse<{
      count: number;
      limit: number;
      offset: number;
      products: IProduct[];
    }>
  > => {
    return await axiosInstance.get(
      `/store/products?fields=${params.fields}&region_id=${params.regionID}`
    );
  },
  getProductByID: async (
    id: string,
    params: ProductApiParams
  ): Promise<AxiosResponse<{ product: IProduct }>> => {
    return await axiosInstance.get(
      `/store/products/${id}?fields=${params.fields}&region_id=${params.regionID}&q=${params.q}`
    );
  },
};
