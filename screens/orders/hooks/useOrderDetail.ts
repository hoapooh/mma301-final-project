import { orderApi, OrderApiParams } from '@/services/orderApi';
import { useQuery } from '@tanstack/react-query';

interface Props {
  apiParams?: OrderApiParams;
}

export const useOrderDetail = (id: string) => {
  const {
    data,
    isPending: isLoadingOrderDetail,
    error: orderDetailError,
  } = useQuery({
    queryKey: ['orderDetail', id],
    queryFn: () => orderApi.getOrderDetail(id),
    select: (res) => res.data.order,
  });

  return {
    orderDetailData: data,
    isLoadingOrderDetail,
    orderDetailError,
  };
};
