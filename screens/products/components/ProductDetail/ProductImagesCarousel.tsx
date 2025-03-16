import { ProductImage } from '@/interfaces/product-interface';
import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

const Index: React.FC<{ data: ProductImage[] | [] | undefined }> = (props) => {
  const scrollOffsetValue = useSharedValue<number>(0);
  if (!props.data || props.data.length === 0) {
    return (
      <View>
        <Text>No images found</Text>
      </View>
    );
  }
  return (
    <View id="carousel-component">
      <Carousel
        testID={'xxx'}
        loop={true}
        width={400}
        height={400}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlayInterval={4000}
        autoPlay
        data={props.data}
        defaultScrollOffsetValue={scrollOffsetValue}
        style={{ width: '100%' }}
        onScrollStart={() => {}}
        onScrollEnd={() => {}}
        onConfigurePanGesture={(g: { enabled: (arg0: boolean) => any }) => {
          'worklet';
          g.enabled(false);
        }}
        onSnapToItem={(index: number) => console.log('current index:', index)}
        renderItem={({ item }) => {
          return (
            <View className="w-full h-full">
              <Image
                source={{
                  uri: item.url,
                }}
                className="w-full h-full"
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Index;
