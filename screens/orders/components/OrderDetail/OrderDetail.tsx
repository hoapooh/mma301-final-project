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

  if (isLoadingOrderDetail) {
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner size="large" />
      </View>
    );
  }

  if (orderDetailError || !orderDetailData) {
    return (
      <View className="p-4 items-center justify-center">
        <Text>Could not load order details</Text>
      </View>
    );
  }

  const order = orderDetailData;

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
      <VStack space="xl" className="p-4 bg-background-50">
        {/* Header - Apple Pay-like */}
        <Card className="bg-white rounded-xl shadow-sm overflow-hidden">
          <VStack className="items-center p-6 bg-gray-900">
            <Box className="w-14 h-14 rounded-full bg-green-500 items-center justify-center mb-2">
              <Ionicons name="checkmark" size={24} color="white" />
            </Box>
            <Heading className="text-white text-xl">Purchase Complete</Heading>
            <Text className="text-white text-sm opacity-80">
              Order #{order.id?.toString().slice(0, 8) || 'Unknown'}
            </Text>
          </VStack>

          <VStack className="p-4">
            <HStack className="justify-between py-2">
              <Text className="text-gray-500">Date</Text>
              <Text>{formattedDate}</Text>
            </HStack>

            <HStack className="justify-between py-2">
              <Text className="text-gray-500">Payment</Text>
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
              <Text className="text-gray-500">Status</Text>
              <Badge size="sm" variant="solid" action="info">
                <Text className="text-xs capitalize">
                  {order.status || 'Unknown'}
                </Text>
              </Badge>
            </HStack>

            <Divider className="my-2" />

            <HStack className="justify-between py-2">
              <Text className="text-gray-500">Email</Text>
              <Text>{order.email || 'Not available'}</Text>
            </HStack>
          </VStack>
        </Card>

        {/* Order Items - Similar to Apple Pay receipt */}
        <Card className="bg-white rounded-xl shadow-sm">
          <VStack className="p-4">
            <Heading size="sm" className="mb-4">
              Order Items
            </Heading>

            {order.items &&
              order.items.map((item) => (
                <VStack key={item.id} className="mb-4">
                  <HStack space="md" className="items-center">
                    <Image
                      source={{
                        uri: item.thumbnail || 'https://via.placeholder.com/60',
                      }}
                      alt={item.title}
                      className="w-16 h-16 rounded-md bg-gray-100"
                      resizeMode="contain"
                    />
                    <VStack className="flex-1">
                      <Text className="font-medium">{item.title}</Text>
                      {item.subtitle && (
                        <Text className="text-sm text-gray-500">
                          {item.subtitle}
                        </Text>
                      )}
                      <HStack className="justify-between">
                        <Text className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </Text>
                        <Text className="font-medium">
                          $
                          {typeof item.total === 'number'
                            ? item.total.toFixed(2)
                            : '0.00'}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  <Divider className="mt-3" />
                </VStack>
              ))}
          </VStack>
        </Card>

        {/* Payment Summary - Apple Pay style */}
        <Card className="bg-white rounded-xl shadow-sm">
          <VStack className="p-4">
            <Heading size="sm" className="mb-4">
              Payment Summary
            </Heading>

            <HStack className="justify-between py-1">
              <Text className="text-gray-500">Subtotal</Text>
              <Text>
                $
                {typeof order.total === 'number'
                  ? (order.total - 1).toFixed(2)
                  : '0.00'}
              </Text>
            </HStack>

            <HStack className="justify-between py-1">
              <Text className="text-gray-500">Shipping</Text>
              <Text>$1.00</Text>
            </HStack>

            <Divider className="my-2" />

            <HStack className="justify-between py-1">
              <Text className="font-bold">Total</Text>
              <Text className="font-bold">
                $
                {typeof order.total === 'number'
                  ? order.total.toFixed(2)
                  : '0.00'}{' '}
                {order.currency_code?.toUpperCase() || 'USD'}
              </Text>
            </HStack>
          </VStack>
        </Card>
      </VStack>
    </ScrollView>
  );
};

export default OrderDetail;
