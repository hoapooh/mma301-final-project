import { ScrollView, View } from 'react-native';
import React from 'react';
import { useOrderList } from '@/screens/orders/hooks/useOrderList';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';
import { router } from 'expo-router';
import { Pressable } from '@/components/ui/pressable';
import { Ionicons } from '@expo/vector-icons';

type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'canceled'
  | 'returned';
type BadgeAction = 'warning' | 'info' | 'success' | 'error' | 'muted';

const getStatusBadge = (status: string) => {
  const statusColors: Record<OrderStatus, BadgeAction> = {
    pending: 'warning',
    processing: 'info',
    shipped: 'success',
    delivered: 'success',
    canceled: 'error',
    returned: 'error',
  };
  return (
    <Badge
      action={statusColors[status as OrderStatus] || 'muted'}
      variant="solid"
    >
      <Text className="text-xs text-white">
        1 <Text className="text-xs text-white">{status.toUpperCase()}</Text>
      </Text>
    </Badge>
  );
};

const OrdersScreen = () => {
  const { orderListData, isLoadingOrderList, orderListError } = useOrderList();

  if (isLoadingOrderList) {
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner size="large" />
      </View>
    );
  }

  if (orderListError) {
    return (
      <View className="p-4">
        <Text>Error loading orders: {orderListError.message}</Text>
      </View>
    );
  }

  if (!orderListData?.orders || orderListData.orders.length === 0) {
    return (
      <VStack className="flex-1 justify-center items-center p-4" space="md">
        <Ionicons name="receipt-outline" size={60} color="#8f8e94" />
        <Text className="text-lg font-medium">No orders yet</Text>
        <Text className="text-center text-gray-500">
          When you place your first order, it will appear here
        </Text>
        <Pressable
          onPress={() => router.push('/(root)/(tabs)/products')}
          className="mt-4"
        >
          <HStack className="bg-primary-600 px-4 py-2 rounded-lg items-center">
            <Text className="text-white font-medium">Start Shopping</Text>
          </HStack>
        </Pressable>
      </VStack>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background-50">
      <VStack className="p-4" space="md">
        {orderListData.orders.map((order) => (
          <Pressable
            key={order.id}
            onPress={() => router.push(`/(root)/(order)/${order.id}`)}
          >
            <Card className="p-4 mb-3 rounded-lg">
              <VStack space="md">
                <HStack className="justify-between items-center">
                  <Text className="font-medium">
                    Order #{order.id.toString().slice(0, 8)}
                  </Text>
                  {getStatusBadge(order.status)}
                </HStack>

                <HStack className="justify-between items-center">
                  <Text className="text-sm text-gray-500">
                    {format(new Date(order.created_at), 'MMMM d, yyyy')}
                  </Text>
                  <Text className="font-medium">${order.total.toFixed(2)}</Text>
                </HStack>

                {order.items && order.items.length > 0 && (
                  <VStack space="xs">
                    {order.items.map((item) => (
                      <HStack key={item.id} space="md" className="items-center">
                        <Image
                          source={
                            item.thumbnail
                              ? { uri: item.thumbnail }
                              : require('@/assets/images/placeholder.jpg')
                          }
                          alt={item.title}
                          className="h-16 w-16 rounded-md bg-gray-100"
                          resizeMode="contain"
                        />
                        <VStack className="flex-1">
                          <Text className="font-medium" numberOfLines={2}>
                            {item.title}
                          </Text>
                          <Text className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </Text>
                        </VStack>
                        <Text className="font-medium">
                          ${item.total.toFixed(2)}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                )}

                <HStack className="items-center">
                  <Ionicons name="chevron-forward" size={16} color="#888" />
                  <Text className="text-sm text-gray-500 ml-1">
                    View details
                  </Text>
                </HStack>
              </VStack>
            </Card>
          </Pressable>
        ))}
      </VStack>
    </ScrollView>
  );
};

export default OrdersScreen;
