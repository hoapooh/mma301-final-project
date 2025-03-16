import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { VStack } from '@/components/ui/vstack';
import CartBottomNav from '@/screens/cart/components/CartBottomNav';
import useCart from '@/screens/cart/hooks/useCart';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text } from 'react-native';

const Cart = () => {
  const { query } = useCart();

  if (query.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (query.isError) {
    return <Text>Error...</Text>;
  }

  return (
    <>
      <Box className="p-2">
        {query?.data?.cart.items.map((item) => (
          <HStack
            key={item.id}
            space="xl"
            className="mb-4 justify-between bg-white py-4  px-2 rounded-lg "
          >
            <Box>
              <Image size="md" source={{ uri: item.thumbnail }} />
            </Box>
            <VStack className="flex-1">
              <Text className="font-bold text-2xl">{item.product_title}</Text>
              <Text className="font-normal text-lg text-gray-400 mb-2">
                {item.variant_title} - Qty: {item.quantity}
              </Text>
              <Text className="font-semibold text-xl">${item.unit_price}</Text>
            </VStack>
            <Box className=" flex justify-end flex-row ">
              <Ionicons name="trash-outline" size={20} color="red" />
            </Box>
          </HStack>
        ))}
      </Box>
      <CartBottomNav cart={query.data?.cart} />
    </>
  );
};

export default Cart;
