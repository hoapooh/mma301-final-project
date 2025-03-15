import useAppStore from '@/configs/store';
import { cartApi } from '@/services/cartApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const KEY = 'CART_ID';

const clearCart = async () => {
  return await AsyncStorage.removeItem(KEY);
};

const useCart = () => {
  const [cartID, setCartID] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: cartApi.createCart,
    onSuccess: async (data) => {
      try {
        await AsyncStorage.setItem(KEY, data.data.cart.id);
        await cartApi.setCustomer(data.data.cart.id);
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
        if (!res) {
          mutation.mutate();
        }
      } catch (error) {
        console.log(error);
      }
    };
    run();
  }, [mutation.isPending]);

  console.log(cartID);

  return {
    cartID,
    query,
    clearCart,
  };
};

export default useCart;
