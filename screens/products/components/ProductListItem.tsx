import React from 'react';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { IProduct } from '@/interfaces/product-interface';

const ProductListItem: React.FC<{product: IProduct}>=({product }) => {
  return (
    <Card className="p-5 rounded-lg max-w-[360px] flex-1">
      <Image
        source={{
          uri: product.thumbnail,
        }}
        className="mb-6 h-64 w-full rounded-md "
        resizeMode='cover'
        alt={`${product.title}`}
      />
      
      <VStack className="mb-6">s
        <Heading size="md" className="mb-4">
          {product.title}
        </Heading>
        <Text size="sm">
          $299
        </Text>
        <Text size="sm">
          {product.subtitle}
        </Text>
      </VStack>
      {/* <Box className="flex-col sm:flex-row">
        <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
          <ButtonText size="sm">View Detail</ButtonText>
        </Button>
      </Box> */}
    </Card>
    
  );
}
export default ProductListItem;
