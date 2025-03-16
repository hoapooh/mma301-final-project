import { orderApi, OrderApiParams } from '@/services/orderApi';
import { useQuery } from '@tanstack/react-query';

interface Props {
  apiParams?: OrderApiParams;
}

export const useOrderList = (props?: Props) => {
  const {
    data: orderListData,
    isPending: isLoadingOrderList,
    error: orderListError,
  } = useQuery({
    queryKey: ['orderList'],
    queryFn: () =>
      orderApi.getOrderList({
        fields: '*items,' + (props?.apiParams?.fields ?? ''),
      }),
    select: (res) => res.data,
  });

  return { orderListData, isLoadingOrderList, orderListError };
};
