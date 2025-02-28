import useAppStore from '@/configs/store';
import { ProductApiParams, productApi } from '@/services/productApi';
import { useQuery } from '@tanstack/react-query';

const useProduct = (id: string) => {
  const regionID = useAppStore((state) => state.regionID);

  const query = useQuery({
    queryKey: ['product', id],
    queryFn: () =>
      productApi.getProductByID(id, {
        fields: '*variants.calculated_price,+variants.inventory_quantity',
        regionID,
      }),
    select: (res) => res.data.product,
    enabled: !!id,
  });
  return query;
};

export default useProduct;
