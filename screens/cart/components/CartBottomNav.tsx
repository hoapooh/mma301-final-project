import { Box } from '@/components/ui/box';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Toast, ToastDescription, useToast } from '@/components/ui/toast';
import { VStack } from '@/components/ui/vstack';
import { ICart } from '@/interfaces/cart-interface';
import useCart from '@/screens/cart/hooks/useCart';
import { cartApi } from '@/services/cartApi';
import { orderApi } from '@/services/orderApi';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Text } from 'react-native';

type Props = {
  cart: ICart | undefined;
};

const CartBottomNav: React.FC<Props> = ({ cart }) => {
  const { cartID, clearCart } = useCart();
  const toast = useToast();
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
    },
    onError: () => {
      toast.show({
        id: String(Math.random()),
        placement: 'top',
        duration: 2000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="solid">
              <ToastDescription>Failed</ToastDescription>
            </Toast>
          );
        },
      });
    },
  });

  if (!cart) {
    return null;
  }

  return (
    <Box className="bg-white absolute bottom-0 w-full left-0 right-0 p-2 h-[90px] justify-center flex">
      <HStack className="items-center h-full">
        <VStack className="flex-1 align-center px-2">
          <Text className="font-normal text-sm text-gray-500 ">
            Total Checkout
          </Text>
          <Text className="text-2xl font-bold">${cart.total}</Text>
        </VStack>
        <Box className="flex-1">
          <Button onPress={() => mutation.mutate()} size="xl">
            {mutation.isPending ? (
              <ButtonSpinner />
            ) : (
              <ButtonText>Checkout</ButtonText>
            )}
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default CartBottomNav;
