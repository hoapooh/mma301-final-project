import useAppStore from '@/configs/store';
import { authApi } from '@/services/authApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useCurrentUser = () => {
  const setUserData = useAppStore((state) => state.setUserData);
  const token = useAppStore((state) => state.token);

  const query = useQuery({
    queryKey: ['user'],
    queryFn: () => authApi.getCurrentUser(),
    enabled: !!token, // Only run the query if token exists
    retry: 1,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setUserData(query.data);
    }
  }, [query.isSuccess, query.data]);

  return query;
};
