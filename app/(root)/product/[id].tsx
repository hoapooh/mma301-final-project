import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import DetailBottomNav from '@/screens/products/components/ProductDetail/DetailBottomNav';
import {
  OptionSection,
  VariantSection,
} from '@/screens/products/components/ProductDetail/DetailSection';
import ProductImagesCarousel from '@/screens/products/components/ProductDetail/ProductImagesCarousel';
import useProduct from '@/screens/products/hooks/useProduct';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
  const [selectedVariant, setSelectedVariant] = React.useState<string | null>(
    null
  );

  const query = useProduct(id as string);

  useEffect(() => {
    if (query.data) {
      setSelectedOption(query.data.options[0].values[0].id);
      setSelectedVariant(query.data.variants[0].id);
    }
  }, [query.isLoading, query.data]);

  if (query.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!query.data) {
    return <Text>Product not found</Text>;
  }

  return (
    <>
      <Box>
        <ProductImagesCarousel data={query.data?.images} />
        <VStack space="2xl" className="p-2 mt-4">
          <Box>
            <Text size="3xl" bold className="">
              {query.data?.title}
            </Text>
          </Box>
          <OptionSection
            data={query.data.options}
            selectedID={selectedOption}
            handleSelect={(id: string) => setSelectedOption(id)}
          />
          <VariantSection
            data={query.data.variants}
            selectedID={selectedVariant}
            handleSelect={(id: string) => setSelectedVariant(id)}
          />
        </VStack>
      </Box>
      <DetailBottomNav
        data={{
          variant_id: selectedVariant ?? '',
          quantity: 1,
        }}
      />
    </>
  );
};

export default ProductDetail;
