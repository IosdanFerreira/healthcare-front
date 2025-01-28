'use server';

import { IDefaultResponse, IUser } from '@/@types';
import { API_CONFIG } from '@/api/api-config';
import { ISignupParams } from '@/interfaces/user';
import { parseStringify } from '@/lib/utils';

export async function createUser(signupParams: ISignupParams): Promise<IDefaultResponse<Omit<IUser, 'access_token' | 'refresh_token'>>> {
  const response: Response = await fetch(`${API_CONFIG.base_url}/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupParams),
  });

  const newUser: IDefaultResponse<Omit<IUser, 'access_token' | 'refresh_token'>> = await response.json();

  return newUser;
}
