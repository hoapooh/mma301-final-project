import SearchHeader from '@/components/header/SearchHeader';
import ProductList from '@/screens/products/components/ProductList';
import useProductList from '@/screens/products/hooks/useProductList';
import { useNavigation } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

const SearchResult = () => {
  const params = useLocalSearchParams();
  const nav = useNavigation();
  const q = Array.isArray(params.q) ? params.q[0] : params.q || '';
  const query = useProductList({ apiParams: { q } });
  if (query.isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <ProductList data={query.data?.products} />
    </View>
  );
};

export default SearchResult;
