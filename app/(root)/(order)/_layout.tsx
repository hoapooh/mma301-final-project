
import React from 'react';
import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const OrderLayout = () => {
    const { id } = useLocalSearchParams();

    return (
        <Stack
            screenOptions={{
                headerTitle: 'Order Details',
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen name={id as string} />
        </Stack>
    );
};

export default OrderLayout;