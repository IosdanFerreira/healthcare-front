'use server';

import { IDefaultResponse, IUser } from '@/@types';
import { API_CONFIG } from '@/back/api-config';
import { fetchServer } from '@/lib/fetch/fetch-server';
import { cookies } from 'next/headers';

export const getUser = async (userId: string): Promise<IDefaultResponse<IUser>> => {
  const response: Response = await fetchServer(`${API_CONFIG.base_url}/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const foundedUser: IDefaultResponse<IUser> = await response.json();

  return foundedUser;
};
