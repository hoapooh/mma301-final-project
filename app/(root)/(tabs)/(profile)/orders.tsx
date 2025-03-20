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
            <Text className="p-1 text-black text-xs font-bold">
                <Text className="text-black text-xs font-bold">{status.toUpperCase()}</Text>
            </Text>
        </Badge>
    );
};

const OrdersScreen = () => {
    const { orderListData, isLoadingOrderList, orderListError } = useOrderList();

    if (isLoadingOrderList) {
        return (
            <View className="flex-1 justify-center items-center">
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
            <VStack className="flex-1 justify-center p-4 items-center" space="md">
                <Ionicons name="receipt-outline" size={60} color="#8f8e94" />
                <Text className="text-lg font-medium">No orders yet</Text>
                <Text className="text-center text-gray-500">
                    When you place your first order, it will appear here
                </Text>
                <Pressable
                    onPress={() => router.push('/(root)/(tabs)/products')}
                    className="mt-4"
                >
                    <HStack className="bg-primary-600 rounded-lg items-center px-4 py-2">
                        <Text className="text-white font-medium">Start Shopping</Text>
                    </HStack>
                </Pressable>
            </VStack>
        );
    }

    return (
        <ScrollView className="flex-1 bg-background-100">
            <VStack className="p-4" space="md">
                {orderListData.orders.map((order) => (
                    <Pressable
                        key={order.id}
                        onPress={() => router.push(`/(root)/(order)/${order.id}`)}
                    >
                        <Card className="p-4 rounded-lg shadow-md mb-3">
                            <VStack space="md">
                                <HStack className="flex-col bg-gray-100 justify-between p-2 rounded-lg gap-y-3 items-start">
                                    <Text className="text-black font-medium">
                                        ID #{order.id.toString()}
                                    </Text>
                                    <View className='flex-row justify-between w-full'>
                                        <Text className="text-gray-500 text-sm">
                                            {format(new Date(order.created_at), 'MMMM d, yyyy')}
                                        </Text>
                                        <Text>
                                            {getStatusBadge(order.status)}
                                        </Text>
                                    </View>
                                </HStack>

                                {order.items && order.items.length > 0 && (
                                    <VStack space="xs">
                                        {order.items.map((item) => (
                                            <HStack key={item.id} space="md" className="items-center my-1">
                                                <Image
                                                    source={
                                                        item.thumbnail
                                                            ? { uri: item.thumbnail }
                                                            : require('@/assets/images/placeholder.jpg')
                                                    }
                                                    alt={item.title}
                                                    className="bg-gray-100 h-16 rounded-md w-16"
                                                    resizeMode="contain"
                                                />
                                                <VStack className="flex-1">
                                                    <Text className="font-medium" numberOfLines={2}>
                                                        {item.title}
                                                    </Text>
                                                    <Text className="text-gray-500 text-sm">
                                                        Qty: {item.quantity}
                                                    </Text>
                                                </VStack>
                                                <Text className="font-bold pr-2">
                                                    ${item.total.toFixed(2)}
                                                </Text>
                                            </HStack>
                                        ))}
                                        <View className="flex-row border-gray-300 border-t justify-between p-2 w-full">
                                            <Text className='text-black font-semibold'>Total</Text>
                                            <Text className="text-black font-medium">${order.total.toFixed(2)}</Text>
                                        </View>
                                    </VStack>
                                )}

                                <HStack className="flex flex-row justify-end">
                                    <Pressable
                                        key={order.id}
                                        onPress={() => router.push(`/(root)/(order)/${order.id}`)}
                                        style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                                        className="flex flex-row bg-black rounded-lg w-auto items-center px-3 py-2"
                                    >
                                        <Ionicons name="chevron-forward" size={16} color="white" />
                                        <Text className="text-sm text-white font-semibold ml-1">
                                            View details
                                        </Text>
                                    </Pressable>
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
