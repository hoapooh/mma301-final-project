import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { ScrollView } from '@/components/ui/scroll-view';
// import { Image } from '@/components/ui/image';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <SafeAreaView className="w-full h-full">
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <VStack className="bg-background-0 w-full h-full justify-center p-6">
          {props.children}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
