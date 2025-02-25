import axiosInstance from '@/configs/axiosInstance';
import { AxiosResponse } from 'axios';

export const regionApi = {
  getRegions: async (): Promise<
    AxiosResponse<{
      regions: {
        id: string;
        name: string;
        currency_code: string;
      }[];
    }>
  > => {
    return await axiosInstance.get(`/store/regions`);
  },
};
