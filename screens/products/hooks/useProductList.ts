import useAppStore from '@/configs/store';
import { GetProductListAPIParams, productApi } from '@/services/productApi';
import { useQuery } from '@tanstack/react-query';

interface Props {
  apiParams: GetProductListAPIParams;
}

const useProductList = (params: Props) => {
  const regionID = useAppStore((state) => state.regionID);

  const query = useQuery({
    queryKey: ['productList'],
    queryFn: () => productApi.getProducts({ ...params.apiParams, regionID }),
    select: (res) => res.data,
  });
  return query;
};

export default useProductList;
