import ProductList from '@/screens/products/components/ProductList';
import useProductList from '@/screens/products/hooks/useProductList';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { Text, View } from 'react-native';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from '@/components/ui/select';
import { ChevronDownIcon } from '@/components/ui/icon';
import React from 'react';
const sortOptions = [
  { key: 'title', label: 'Name: A-Z' },
  { key: '-title', label: 'Name: Z-A' },
];
const SortSelection = (props: any) => {
  return (
    <View
      style={{
        width: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Text
        style={{
          width: '50%',
          justifyContent: 'flex-start',
          opacity: 0.5,
          textAlignVertical: 'center',
        }}
      >
        Total product(s): {props.data?.length || 0}
      </Text>
      <Select
        defaultValue={sortOptions[0].label}
        onValueChange={(key) => props.handleSort(key)}
        style={{ width: '50%', justifyContent: 'flex-end' }}
      >
        <SelectTrigger variant="outline" size="md" className="w-full h-50">
          <SelectInput placeholder="Sort option" />
          <SelectIcon className="mr-3" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {sortOptions.map((option) => (
              <SelectItem
                key={option.key}
                label={option.label}
                value={option.key}
              />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </View>
  );
};
const SearchResult = () => {
  const [sort, setSort] = React.useState('title');
  const params = useLocalSearchParams();
  const q = Array.isArray(params.q) ? params.q[0] : params.q || '';
  const query = useProductList({ apiParams: { q, order: sort } });
  if (query.isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <SortSelection
        data={query.data?.products}
        handleSort={(key: string) => setSort(key)}
      />
      <ProductList data={query.data?.products} />
    </View>
  );
};

export default SearchResult;
