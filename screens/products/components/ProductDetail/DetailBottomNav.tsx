import { queryClient } from '@/app/_layout';
import { Box } from '@/components/ui/box';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Toast, ToastDescription, useToast } from '@/components/ui/toast';
import { VStack } from '@/components/ui/vstack';
import { IProductVariant } from '@/interfaces/product-interface';
import useCart from '@/screens/cart/hooks/useCart';
import { cartApi } from '@/services/cartApi';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Text } from 'react-native';

interface Props {
  variant: IProductVariant;
}

const DetailBottomNav: React.FC<Props> = (props) => {
  const { cartID } = useCart();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: () => {
      return cartApi.addLineItem(cartID ?? '', {
        variant_id: props?.variant?.id,
        quantity: 1,
      });
    },
    onSuccess: () => {
      toast.show({
        id: String(Math.random()),
        placement: 'top',
        duration: 2000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="success" variant="solid">
              <ToastDescription>Add to cart successfully</ToastDescription>
            </Toast>
          );
        },
      });
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
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
              <ToastDescription>Failed to add to cart</ToastDescription>
            </Toast>
          );
        },
      });
    },
  });

  return (
    <Box className="bg-white absolute bottom-0 w-full left-0 right-0 p-2 h-[90px] justify-center flex">
      <HStack className="justify-between items-center h-full">
        <VStack className="flex-1 align-center px-2">
          <Text className="font-normal text-sm text-gray-500 ">
            Total Checkout
          </Text>
          <Text className="text-2xl font-bold">
            ${props.variant.calculated_price.original_amount}
          </Text>
        </VStack>
        <Box className="flex-1">
          <Button onPress={() => mutation.mutate()}>
            {mutation.isPending ? (
              <ButtonSpinner />
            ) : (
              <ButtonText>Add to cart</ButtonText>
            )}
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default DetailBottomNav;
