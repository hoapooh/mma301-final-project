import useAppStore from '@/configs/store';
import { cartApi } from '@/services/cartApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const KEY = 'CART_ID';

const useCart = () => {
  const store = useAppStore();
  const [cartID, setCartID] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: cartApi.createCart,
    onSuccess: async (data) => {
      try {
        await AsyncStorage.setItem(KEY, data.data.cart.id);
        setCartID(data.data.cart.id);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const query = useQuery({
    queryKey: ['cart', cartID],
    queryFn: () => cartApi.getCart(cartID),
    enabled: !!cartID,
    select: (res) => res.data,
  });

  useEffect(() => {
    const getCartID = async () => {
      try {
        const res = await AsyncStorage.getItem(KEY);
        setCartID(res);
      } catch (error) {
        console.log(error);
      }
    };

    getCartID();
  }, [cartID]);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await AsyncStorage.getItem(KEY);
        console.log('res', res);
        if (!res) {
          mutation.mutate();
        }
      } catch (error) {
        console.log(error);
      }
    };
    run();
  }, [mutation.isPending]);

  useEffect(() => {
    if (query.isSuccess) {
      store.setCart(query.data.cart);
    }
  }, [query.isLoading]);

  return {
    cart: store.cart,
    cartID,
    isLoading: query.isLoading,
    error: query.error,
  };
};

export default useCart;
