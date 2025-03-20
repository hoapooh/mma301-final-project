import React from 'react';
import { ScrollView } from 'react-native';
import { useOrderDetail } from '../../hooks/useOrderDetail';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Divider } from '@/components/ui/divider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { View } from '@/components/ui/view';
import { Avatar } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { format, parseISO } from 'date-fns'; // Import parseISO
import { Ionicons } from '@expo/vector-icons';

type Props = {
    orderId: string;
};

const OrderDetail = ({ orderId }: Props) => {
    const { orderDetailData, isLoadingOrderDetail, orderDetailError } =
        useOrderDetail(orderId);

    const defaultStatus = {
        pending: { color: '#FCC737', icon: 'timer' },
        processing: { color: '#FCC737', icon: 'settings' },
        shipped: { color: 'green', icon: 'checkmark' },
        delivered: { color: 'green', icon: 'checkmark' },
        canceled: { color: 'red', icon: 'close-circle' },
        returned: { color: 'red', icon: 'arrow-undo-circle-outline' },
    }



    if (isLoadingOrderDetail) {
        return (
            <View className="flex-1 justify-center items-center">
                <Spinner size="large" />
            </View>
        );
    }

    if (orderDetailError || !orderDetailData) {
        return (
            <View className="justify-center p-4 items-center">
                <Text>Could not load order details</Text>
            </View>
        );
    }

    const order = orderDetailData;

    const orderStatus = defaultStatus[order.status.toLowerCase() || 'pending'];


    // Safely format the date
    let formattedDate = 'Unknown date';
    try {
        if (order.created_at) {
            formattedDate = format(parseISO(order.created_at), 'MMMM d, yyyy');
        }
    } catch (error) {
        console.log('Error formatting date:', error);
    }

    return (
        <ScrollView>
            <VStack space="xl" className="bg-background-100 p-4">
                {/* Header - Apple Pay-like */}
                <Card className="bg-white rounded-xl shadow-md overflow-hidden">
                    <Text className='bg-black p-3 rounded-xl text-center text-white font-bold uppercase'>general</Text>
                    <VStack className="items-center mt-4">
                        <Ionicons name={orderStatus.icon} size={70} color={orderStatus.color} />
                    </VStack>

                    <VStack className="p-4">
                        <HStack className="justify-between py-2">
                            <Text className="text-black font-semibold">ID</Text>
                            <Text>#{order.id.toString()}</Text>
                        </HStack>

                        <HStack className="justify-between py-2">
                            <Text className="text-black font-semibold">Date</Text>
                            <Text>{formattedDate}</Text>
                        </HStack>

                        <HStack className="justify-between py-2">
                            <Text className="text-black font-semibold">Payment</Text>
                            <Badge
                                size="sm"
                                variant={
                                    order.payment_status === 'captured' ? 'solid' : 'outline'
                                }
                                action={
                                    order.payment_status === 'captured' ? 'success' : 'warning'
                                }
                            >
                                <Text className="text-xs capitalize">
                                    {order.payment_status || 'Unknown'}
                                </Text>
                            </Badge>
                        </HStack>

                        <HStack className="justify-between py-2">
                            <Text className="text-black font-semibold">Status</Text>
                            <Badge size="sm" variant="solid" action="info">
                                <Text className="text-xs capitalize">
                                    {order.status || 'Unknown'}
                                </Text>
                            </Badge>
                        </HStack>

                        <HStack className="justify-between py-2">
                            <Text className="text-black font-semibold">Email</Text>
                            <Text>{order.email || 'Not available'}</Text>
                        </HStack>
                    </VStack>
                </Card>

                {/* Order Items - Similar to Apple Pay receipt */}
                <Card className="bg-white rounded-xl shadow-md">
                    <Text className='bg-black p-3 rounded-xl text-center text-white font-bold uppercase'>Order items</Text>

                    <VStack className="p-4">

                        {order.items &&
                            order.items.map((item) => (
                                <VStack key={item.id} className="flex items-center mb-4">
                                    <HStack space="md" className="items-center">
                                        <Image
                                            source={{
                                                uri: item.thumbnail || 'https://via.placeholder.com/60',
                                            }}
                                            alt={item.title}
                                            className="bg-gray-100 h-16 rounded-md w-16"
                                            resizeMode="contain"
                                        />
                                        <VStack className="flex flex-1 flex-row justify-between items-center">
                                            <View>
                                                <Text className="font-medium">{item.title}</Text>
                                                {item.subtitle && (
                                                    <Text className="text-gray-500 text-sm">
                                                        {item.subtitle}
                                                    </Text>
                                                )}
                                                <HStack className="justify-between">
                                                    <Text className="text-gray-500 text-sm">
                                                        Qty: {item.quantity}
                                                    </Text>
                                                </HStack>
                                            </View>

                                            <Text className="font-medium">
                                                $
                                                {typeof item.total === 'number'
                                                    ? item.total.toFixed(2)
                                                    : '0.00'}
                                            </Text>
                                        </VStack>
                                    </HStack>

                                </VStack>
                            ))}
                    </VStack>
                </Card>

                {/* Payment Summary - Apple Pay style */}
                <Card className="bg-white rounded-xl shadow-md">
                    <Text className='bg-black p-3 rounded-xl text-center text-white font-bold uppercase'>payment summary</Text>
                    <VStack className="p-4">

                        <HStack className="justify-between py-1">
                            <Text className="text-black font-semibold">Subtotal</Text>
                            <Text>
                                $
                                {typeof order.total === 'number'
                                    ? (order.total - 1).toFixed(2)
                                    : '0.00'}
                            </Text>
                        </HStack>

                        <HStack className="justify-between mb-2 py-1">
                            <Text className="text-black font-semibold">Shipping</Text>
                            <Text>$1.00</Text>
                        </HStack>

                        <Divider className="my-4" />

                        <HStack className="flex flex-row justify-between w-full items-center mt-1 py-1">
                            <View className='w-1/3'>
                                <Text className="text-black w-full font-bold">Total</Text>
                            </View>
                            <View className='bg-red-500 rounded-lg px-3 py-2'>
                                <Text className="text-white w-full font-bold">
                                    $
                                    {typeof order.total === 'number'
                                        ? order.total.toFixed(2)
                                        : '0.00'}{' '}
                                </Text>
                            </View>
                        </HStack>
                    </VStack>
                </Card>
            </VStack>
        </ScrollView>
    );
};

export default OrderDetail;
