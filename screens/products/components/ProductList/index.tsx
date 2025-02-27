import { ScrollView, View } from 'react-native';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { IProduct } from '@/interfaces/product-interface';
import getProductPrice from '../../utils/getProductPrice';
import { Link } from 'expo-router';
import { Grid, GridItem } from '@/components/ui/grid';


const ProductListItem: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Card className=" rounded-lg w-full border-red-100">
      <Link
        href={{
          pathname: `/product/[id]`,
          params: {
            id: product.id,
          },
        }}
      >
        <Image
          source={{
            uri: product.thumbnail,
          }}
          className="mb-6 h-64 w-full rounded-md "
          resizeMode="contain"
          alt={product.title}
        />

        <VStack className="mb-6">
        <Text size="sm">{product.title}</Text>
          <Heading size="md" className="mb-4">
          ${getProductPrice(product)}
          </Heading>
        </VStack>
      </Link>
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
    <ScrollView className="h-full px-2">
      <Grid
        className="gap-5"
        _extra={{
          className: 'grid-cols-2'
        }}
      >
        {props.data.map((product) => (
          <GridItem key={product.id} _extra={{
            className: "col-span-1"
          }}>
            <ProductListItem product={product} />
          </GridItem>
        ))}
      </Grid>
      
    </ScrollView>
  );
};

export default ProductList;
