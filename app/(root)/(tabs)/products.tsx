import ProductList from '@/screens/products/components/ProductList';
import useProductList from '@/screens/products/hooks/useProductList';
import React from 'react';
import { Text, View } from 'react-native';
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
    </View>
  );
};

export default Products;
