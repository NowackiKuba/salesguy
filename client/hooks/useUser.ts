'use client';

import { getUser } from '@/actions/user.actions';
import { useQuery } from '@tanstack/react-query';
import { UUID } from 'crypto';

export const useUser = ({ id }: { id?: UUID }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getUser', { id }],
    queryFn: async () => await getUser({ id }),
  });

  return { data, isLoading };
};
