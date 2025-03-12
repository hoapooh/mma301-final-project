import { ScrollView } from 'react-native';
import React from 'react';
import { useOrderList } from '../hooks/useOrderList';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';

const Orders = () => {
  const { orderListData, isLoadingOrderList, orderListError } = useOrderList();

  if (isLoadingOrderList) return <Spinner />;

  if (orderListError) {
    return <Text>Error loading orders: {orderListError.message}</Text>;
  }

  console.log(orderListData);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    ></ScrollView>
  );
};

export default Orders;
