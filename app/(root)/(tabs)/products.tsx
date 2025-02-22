import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '@/services/productApi';
import { SafeAreaView } from 'react-native-safe-area-context';
const Products = () => {
  const query = useQuery({
    queryKey: ['productList'],
    queryFn: productApi.getProducts,
    select: (res) => res.data,
  });

  if (query.isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Products</Text>
      <FlatList
        data={query.data.products}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.title}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Products;
