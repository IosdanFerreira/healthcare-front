'use server';

import { ISignupParams } from '@/interfaces/user';
import { parseStringify } from '@/lib/utils';

export async function createUser(signupParams: ISignupParams) {
  try {
    const response = await fetch('http://localhost:3001/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupParams),
    });

    const newUser = await response.json();

    return parseStringify(newUser);
  } catch (error: any) {
    console.error('Erro ao cadastrar usuário:', error);
  }
}
