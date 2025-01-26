'use server';

import { IDefaultResponse, IUser } from '@/@types';
import { API_CONFIG } from '@/api/api-config';
import { ILoginParams } from '@/interfaces/user';
import { cookies } from 'next/headers';

export async function login(loginParams: ILoginParams): Promise<IDefaultResponse<IUser>> {
  const cookieStore = await cookies();

  const response: Response = await fetch(`${API_CONFIG.base_url}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginParams),
  });

  const user: IDefaultResponse<IUser> = await response.json();

  // Se a API não retornar erros, deve definir o token de acesso e o refresh-token nos Cookies
  if (!user.errors) {
    // Define o token de acesso nos Cookies
    cookieStore.set({
      name: 'access_token',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60,
      value: user.data.access_token,
      path: '/',
    });

    // Define o refresh-token nos Cookies
    cookieStore.set({
      name: 'refresh_token',
      value: user.data.refresh_token,
    });
  }

  return user;
}
