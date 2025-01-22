'use server';

import { parseStringify } from '@/lib/utils';
import { cookies } from 'next/headers';

export const getUser = async (userId: string) => {
  const cookieStore = await cookies();

  const response = await fetch(`http://localhost:3001/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookieStore.get('accessToken')?.value}`,
    },
  });

  const foundedUser = await response.json();

  return parseStringify(foundedUser);
};
