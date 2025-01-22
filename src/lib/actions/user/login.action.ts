'use server';

import { ILoginParams } from '@/interfaces/user';
import { parseStringify } from '@/lib/utils';
import { cookies } from 'next/headers';

export async function login(loginParams: ILoginParams) {
  const cookieStore = await cookies();

  const response = await fetch('http://localhost:3001/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginParams),
  });

  const loggedUser = await response.json();

  if (loggedUser.error) {
    return parseStringify(loggedUser);
  }

  cookieStore.set({
    name: 'accessToken',
    value: loggedUser.accessToken,
  });

  return parseStringify(loggedUser);
}
