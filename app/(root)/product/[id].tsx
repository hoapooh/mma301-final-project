import ProductImagesCarousel from '@/screens/products/components/ProductDetail/ProductImagesCarousel';
import useProduct from '@/screens/products/hooks/useProduct';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const ProductDetail = () => {
  const { id } = useLocalSearchParams();

  const query = useProduct(id as string);

  if (query.isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View>
      <ProductImagesCarousel data={query.data?.images} />
    </View>
  );
};

export default ProductDetail;
