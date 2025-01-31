import { JWTPayload, jwtVerify } from 'jose';
import { SESSION_CONFIG } from './session-config';
import { ISessionPayload } from './types/session-payload.interface';

/**
 * Decodifica a sessão do usuario e retorna o payload do JWT.
 *
 * @param session - A sessão do usuario como string
 * @returns Um objeto com o payload do JWT ou undefined
 */
export async function decryptSession(session: string | undefined = ''): Promise<ISessionPayload | undefined> {
  // Verifica se a sessão existe
  if (!session) {
    return undefined;
  }

  try {
    // Verifica a sessão com a chave secreta
    const { payload } = await jwtVerify(session, SESSION_CONFIG.encodedKey, { algorithms: ['HS256'] });

    // Retorna o payload do JWT
    return payload as ISessionPayload;
  } catch (error) {
    // Caso ocorra um erro, exibe o erro na console
    console.log('Erro ao verificar a sessãO', error);
  }
}
