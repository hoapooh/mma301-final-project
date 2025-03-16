import useAppStore from '@/configs/store';
import { ProductApiParams, productApi } from '@/services/productApi';
import { useQuery } from '@tanstack/react-query';

interface Props {
  apiParams?: ProductApiParams;
}

const useProductList = (params?: Props) => {
  const regionID = useAppStore((state) => state.regionID);
  const query = useQuery({
    queryKey: ['productList', params?.apiParams?.q, params?.apiParams?.order],
    queryFn: () => productApi.getProducts({ ...params?.apiParams, regionID, fields: "*variants.calculated_price,+variants.inventory_quantity," + (params?.apiParams?.fields ?? "") }),
    select: (res) => res.data,
  });
  return query;
};

export default useProductList;
