import axiosInstance from '@/configs/axiosInstance';
import { IProduct } from '@/interfaces/product-interface';
import { AxiosResponse } from 'axios';

export interface GetProductListAPIParams {
  fields?: string;
  regionID?: string | null;
}

export const productApi = {
  getProducts: async (
    params: GetProductListAPIParams
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
};
