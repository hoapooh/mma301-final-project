import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import OrderDetail from '@/screens/orders/components/OrderDetail/OrderDetail';

export default function OrderPage() {
  const { id } = useLocalSearchParams();

  return <OrderDetail orderId={id as string} />;
}
