import { View, Text } from 'react-native';
import React from 'react';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { cartApi, IAddCart } from '@/services/cartApi';
import useCart from '@/screens/cart/hooks/useCart';
import { queryClient } from '@/app/_layout';
import { orderApi } from '@/services/orderApi';

const CartBottomNav: React.FC = () => {
  const { cartID, clearCart } = useCart();
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const so = await orderApi.getShippingMethods(cartID ?? '');
        const shippingMethodID = so.data.shipping_options[0].id;
        await cartApi.setShippingMethod(cartID ?? '', shippingMethodID);
        const res = await orderApi.createPaymentCollection(cartID ?? '');
        await orderApi.initPaymentSession(res.data.payment_collection.id);
        await cartApi.completeCart(cartID ?? '');
      } catch (error) {
        console.log('place order:', error);
      }
    },
    onSuccess: async () => {
      await clearCart();
      console.log('clear cart');
    },
    onError: console.error,
  });

  return (
    <Box className="bg-white absolute bottom-0 w-full left-0 right-0 p-2 h-[90px] justify-center flex">
      <HStack className="justify-between items-center h-full">
        <Text>CartBottomNav</Text>
        <Button onPress={mutation.mutate}>
          {mutation.isPending ? (
            <ButtonSpinner />
          ) : (
            <ButtonText>Thanh toán</ButtonText>
          )}
        </Button>
      </HStack>
    </Box>
  );
};

export default CartBottomNav;
