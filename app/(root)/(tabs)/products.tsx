import ProductList from '@/screens/products/components/ProductList';
import useProductList from '@/screens/products/hooks/useProductList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';
const Products = () => {
  const query = useProductList();
  if (query.isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="h-full bg-gray-100">
      <ProductList data={query.data?.products} />
      <Button title="clear" onPress={() => router.push('/sign-in')} />
    </View>
  );
};

export default Products;
