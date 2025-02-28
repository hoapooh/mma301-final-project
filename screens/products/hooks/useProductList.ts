import useAppStore from '@/configs/store';
import { ProductApiParams, productApi } from '@/services/productApi';
import { useQuery } from '@tanstack/react-query';

interface Props {
  apiParams: ProductApiParams;
}

const useProductList = (params: Props) => {
  const regionID = useAppStore((state) => state.regionID);
  const {q} = params.apiParams;
  const query = useQuery({
    queryKey: ['productList', q],
    queryFn: () => productApi.getProducts({ ...params.apiParams, regionID }),
    select: (res) => res.data,
  });
  return query;
};

export default useProductList;
