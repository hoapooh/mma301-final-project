import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export const profileOptions = [
  {
    icon: <Ionicons name="person-circle" size={28} color="black" />,
    title: 'Account Information',
    onPress: () => router.push('/(root)/(tabs)/(profile)/account'),
  },
  {
    icon: <Ionicons name="location" size={28} color="black" />,
    title: 'My Addresses',
    onPress: () => router.push('/(root)/(tabs)/(profile)/address'),
  },
  {
    icon: <Ionicons name="receipt" size={28} color="black" />,
    title: 'My Orders',
    onPress: () => {},
  },
];
