import { router } from 'expo-router';
import { useOrderList } from '@/screens/orders/hooks/useOrderList';
import { Spinner } from '@/components/ui/spinner';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Badge } from '@/components/ui/badge';
import { Pressable } from '@/components/ui/pressable';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const getStatusBadge = (status: string) => {
  const statusColors: Record<
    string,
    'warning' | 'info' | 'success' | 'error' | 'muted'
  > = {
    pending: 'warning',
    processing: 'info',
    shipped: 'success',
    delivered: 'success',
    canceled: 'error',
    returned: 'error',
  };

  return (
    <Badge action={statusColors[status] || 'muted'} variant="solid">
      <Text className="text-xs text-white">{status.toUpperCase()}</Text>
    </Badge>
  );
};

const OrderHistorySection = () => {
  const { orderListData, isLoadingOrderList } = useOrderList();

  if (isLoadingOrderList) {
    return (
      <VStack space="md" className="w-full">
        <Heading size="md">Recent Orders</Heading>
        <Card className="p-4 items-center justify-center h-20">
          <Spinner />
        </Card>
      </VStack>
    );
  }

  if (!orderListData?.orders || orderListData.orders.length === 0) {
    return (
      <VStack space="md" className="w-full">
        <Heading size="md">Recent Orders</Heading>
        <Card className="p-4 items-center">
          <VStack space="xs" className="items-center">
            <Ionicons name="receipt-outline" size={32} color="#888" />
            <Text>No orders yet</Text>
            <Pressable onPress={() => router.push('/(root)/(tabs)/products')}>
              <Text className="text-primary-600">Start Shopping</Text>
            </Pressable>
          </VStack>
        </Card>
      </VStack>
    );
  }

  return (
    <VStack space="md" className="w-full">
      <Heading size="md">Recent Orders</Heading>

      {orderListData.orders.slice(0, 3).map((order) => (
        <Pressable
          key={order.id}
          onPress={() => router.push(`/(root)/(order)/${order.id}`)}
        >
          <Card className="p-3 mb-2 rounded-lg">
            <VStack space="sm">
              <HStack className="justify-between items-center">
                <Text className="font-medium">
                  Order #{order.id.toString().slice(0, 8)}
                </Text>
                {getStatusBadge(order.status)}
              </HStack>

              <HStack className="justify-between items-center">
                <Text className="text-sm text-gray-500">
                  {format(new Date(order.created_at), 'MMM d, yyyy')}
                </Text>
                <Text className="font-medium">${order.total.toFixed(2)}</Text>
              </HStack>

              {order.items && order.items.length > 0 && (
                <HStack space="sm" className="mt-1">
                  {order.items.slice(0, 2).map((item) => (
                    <Image
                      key={item.id}
                      source={
                        item.thumbnail
                          ? { uri: item.thumbnail }
                          : require('@/assets/images/placeholder.jpg')
                      }
                      alt={item.title}
                      className="h-12 w-12 rounded-md bg-gray-100"
                      resizeMode="contain"
                    />
                  ))}
                  {order.items.length > 2 && (
                    <HStack className="h-12 w-12 bg-gray-100 rounded-md items-center justify-center">
                      <Text className="text-gray-500">
                        +{order.items.length - 2}
                      </Text>
                    </HStack>
                  )}
                </HStack>
              )}
            </VStack>
          </Card>
        </Pressable>
      ))}

      {orderListData.orders.length > 3 && (
        <Pressable
          onPress={() => router.push('/(root)/(tabs)/(profile)/orders')}
        >
          <HStack className="items-center justify-center py-2">
            <Text className="text-primary-600 mr-1">View all orders</Text>
            <Ionicons name="chevron-forward" size={16} color="#0099ff" />
          </HStack>
        </Pressable>
      )}
    </VStack>
  );
};

export default OrderHistorySection;
