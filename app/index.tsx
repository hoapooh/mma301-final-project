import ScreenLoader from '@/components/Loader/ScreenLoader';
import useAppStore from '@/configs/store';
import useCart from '@/screens/cart/hooks/useCart';
import { regionApi } from '@/services/regionApi';
import { useQuery } from '@tanstack/react-query';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const setRegion = useAppStore((state) => state.setRegion);
  const token = useAppStore((state) => state.token);
  console.log(token);
  const { initializeAuth } = useAppStore((state) => state);
  const { query: cartQuery } = useCart();
  const query = useQuery({
    queryKey: ['regionList'],
    queryFn: () => regionApi.getRegions(),
    select: (res) => res.data,
  });

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    if (query.isSuccess) {
      setRegion(query.data.regions[0].id);
    }
  }, [query.isSuccess]);

  if (query.isLoading || cartQuery.isLoading) {
    return <ScreenLoader />;
  }

  return <Redirect href={'/products'} />;
}
