import ProductList from '@/screens/products/components/ProductList';
import useProductList from '@/screens/products/hooks/useProductList';
import { UnknownOutputParams } from 'expo-router';
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks';
import { Text, View } from 'react-native';

const Search = () => {
  const params = useLocalSearchParams();
const q = Array.isArray(params.q) ? params.q[0] : params.q || '';
  console.log('Search q', q);
  const query = useProductList({ apiParams: { q } });
  console.log('Fetched products:', query.data?.products);
  if (query.isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <ProductList data={query.data?.products} />
    </View>
  );
};

export default Search;
