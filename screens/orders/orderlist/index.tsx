import { ScrollView } from 'react-native';
import React from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useOrderList } from '../hooks/useOrderList';

const Orders = () => {
  const { orderListData, isLoadingOrderList, orderListError } = useOrderList();

  if (isLoadingOrderList) return <Spinner />;

  if (orderListError) {
    return <Text>Error loading orders: {orderListError.message}</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    ></ScrollView>
  );
};

export default Orders;
