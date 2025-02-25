import { View, FlatList } from 'react-native';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { IProduct } from '@/interfaces/product-interface';
import getProductPrice from '../../utils/getProductPrice';

const ProductListItem: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Card className="p-5 rounded-lg max-w-[360px] flex-1">
      <Image
        source={{
          uri: product.thumbnail,
        }}
        className="mb-6 h-64 w-full rounded-md "
        resizeMode="cover"
        alt={`${product.title}`}
      />

      <VStack className="mb-6">
        <Heading size="md" className="mb-4">
          {product.title}
        </Heading>
        <Text size="sm">${getProductPrice(product)}</Text>
      </VStack>
    </Card>
  );
};
interface ProductListProps {
  data: IProduct[] | [] | undefined;
}
const ProductList: React.FC<ProductListProps> = (props) => {
  if (!props.data || props.data.length === 0) {
    return (
      <View>
        <Text>No products found</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={props.data}
        numColumns={2}
        contentContainerClassName="gap-2"
        columnWrapperClassName="gap-2"
        renderItem={({ item }) => {
          return <ProductListItem product={item} />;
        }}
      />
    </View>
  );
};

export default ProductList;
