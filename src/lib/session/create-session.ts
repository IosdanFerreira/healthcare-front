import 'server-only';
import { cookies } from 'next/headers';
import { encryptSession } from './encrypt-session';
import { ISessionPayload } from '@/lib/session/types/session-payload.interface';

/**
 * Cria uma nova session e armazena nos cookies.
 *
 * @param {ISessionPayload} payload - O payload que será armazenado na session
 */
export async function createSession(payload: ISessionPayload): Promise<void> {
  // Define o tempo de expiração da token (7 dias)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // Encripta o payload e o transforma em uma session
  const session = await encryptSession(payload);

  const cookieStore = await cookies();

  // Define a session nos cookies
  cookieStore.set('session', session, {
    // Tornar o cookie acessível apenas ao servidor web
    httpOnly: true,

    // Torna o cookie acessível somente por HTTPS
    secure: true,

    // Define a data de expiração do token
    expires: expiresAt,

    // Permite que o cookie seja enviado em solicitações para o mesmo site de onde o cookie veio
    sameSite: 'lax',

    // Define o caminho para a rota raiz
    path: '/',
  });
}
