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
} from "@/components/ui/select"
import { ChevronDownIcon } from "@/components/ui/icon"
const sortOptions = [
  { key: "high-low", label: "Price: High-Low" },
  { key: "low-high", label: "Price: Low-High" },
  { key: "a-z", label: "Name: A-Z" },
  { key: "z-a", label: "Name: Z-A" },
];
const SortSelection = ()=>{
  return (
    
    <View style={{ width: "100%", padding: 10, display: 'flex', flexDirection:'row'}}>
    <Text style={{ width:"50%", justifyContent: 'flex-start', opacity: 0.5, textAlignVertical:'center'}}>Total product(s):</Text>
    <Select style={{ width:"50%", justifyContent: 'flex-end' }}>
      <SelectTrigger variant="outline" size="md" className="w-full h-50" >
        <SelectInput placeholder="Sort option"/>
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {sortOptions.map((option) => (
              <SelectItem key={option.key} label={option.label} value={option.key} />
            ))}
        </SelectContent>
      </SelectPortal>
    </Select>
    </View>
   
  )
}
const SearchResult = () => {
  const params = useLocalSearchParams();
  const q = Array.isArray(params.q) ? params.q[0] : params.q || '';
  const query = useProductList({ apiParams: { q } });
  if (query.isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <SortSelection/>
      <ProductList data={query.data?.products} />
    </View>
  );
};

export default SearchResult;
