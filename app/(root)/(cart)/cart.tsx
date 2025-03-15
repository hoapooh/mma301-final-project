import CartBottomNav from '@/screens/cart/components/CartBottomNav';
import useCart from '@/screens/cart/hooks/useCart';
import React from 'react';
import { Text, View } from 'react-native';

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
      <View>
        {query?.data?.cart.items.map((item) => (
          <Text key={item.id}>
            {item.product_title} - {item.variant_title} x {item.quantity}
          </Text>
        ))}
      </View>
      <CartBottomNav />
    </>
  );
};

export default Cart;
