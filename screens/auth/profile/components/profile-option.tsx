import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

interface ProfileOptionProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

const ProfileOption: React.FC<ProfileOptionProps> = ({
  icon,
  title,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="py-3 w-full border-b border-b-stone-300"
    >
      <HStack className="items-center justify-between">
        <HStack space="3xl">
          {icon}

          <Text size="2xl" className="font-semibold text-black">
            {title}
          </Text>
        </HStack>

        <Ionicons
          name="arrow-forward-circle-sharp"
          className="ml-auto"
          size={28}
          color="black"
        />
      </HStack>
    </Pressable>
  );
};

export default ProfileOption;
