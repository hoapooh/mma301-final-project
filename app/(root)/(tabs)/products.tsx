import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '@/services/productApi';
import ProductListItem from '@/screens/products/components/ProductListItem';
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

  console.log(query.data.products);

  return (
    <View>
      <FlatList
        data={query.data.products}
        numColumns={2}
        contentContainerClassName='gap-2'
        columnWrapperClassName='gap-2'
        renderItem={({ item }) => {
          return (
            <ProductListItem product = {item}/>
          );
        }}
      />
    </View>
  );
};

export default Products;
