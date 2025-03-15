import { View, Text } from 'react-native';
import React from 'react';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { cartApi, IAddCart } from '@/services/cartApi';
import useCart from '@/screens/cart/hooks/useCart';
import { queryClient } from '@/app/_layout';

interface Props {
  data: IAddCart;
}

const DetailBottomNav: React.FC<Props> = (props) => {
  const { cartID } = useCart();
  const mutation = useMutation({
    mutationFn: () => {
      return cartApi.addLineItem(cartID ?? '', props.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart', cartID],
      });
    },
    onError: console.error,
  });

  return (
    <Box className="bg-white absolute bottom-0 w-full left-0 right-0 p-2 h-[90px] justify-center flex">
      <HStack className="justify-between items-center h-full">
        <Text>DetailBottomNav</Text>
        <Button onPress={mutation.mutate}>
          {mutation.isPending ? (
            <ButtonSpinner />
          ) : (
            <ButtonText>Thêm vào giỏ hàng</ButtonText>
          )}
        </Button>
      </HStack>
    </Box>
  );
};

export default DetailBottomNav;
