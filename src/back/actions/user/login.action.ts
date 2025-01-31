'use server';
import { ILoginParams } from '@/interfaces/user';
import { API_CONFIG } from '@/back/api-config';
import { IDefaultResponse, IUser } from '@/@types';
import { createSession, ISessionPayload } from '@/lib/session';

export async function login(loginParams: ILoginParams): Promise<IDefaultResponse<IUser>> {
  const response: Response = await fetch(`${API_CONFIG.base_url}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginParams),
  });

  const result: IDefaultResponse<IUser> = await response.json();

  if (result.success) {
    const userFromSession: ISessionPayload = {
      user_id: result.data.id,
      first_name: result.data.first_name,
      last_name: result.data.last_name,
      access_token: result.data.access_token,
      refresh_token: result.data.refresh_token,
    };

    await createSession(userFromSession);
  }

  return result;
}
