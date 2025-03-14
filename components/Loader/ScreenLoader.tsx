import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { Image } from 'react-native';

const ScreenLoader = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Image  style={{ width: 150, height: 150, borderRadius: 10 }} source={require('../../assets/images/capy-closet.jpg') } alt="loading..." />
    </SafeAreaView>
  );
};

export default ScreenLoader;
