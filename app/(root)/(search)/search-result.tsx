import ProductList from '@/screens/products/components/ProductList';
import useProductList from '@/screens/products/hooks/useProductList';
import { UnknownOutputParams } from 'expo-router';
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks';
import { Text, View } from 'react-native';

const SearchResult = () => {
  const query = useProductList({ apiParams: { q: '16' } });

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
