import { JWTPayload, SignJWT } from 'jose';
import { SESSION_CONFIG } from './session-config';
import { ISessionPayload } from '@/lib/session/types/session-payload.interface';

/**
 * Criptografa a session usando o algoritmo HS256
 *
 * @param payload - O JWT payload a ser encriptado
 * @returns Uma promise que retorna uma string JWT assinada
 */
export async function encryptSession(payload: ISessionPayload): Promise<string> {
  // Cria uma nova instância SignJWT com o payload fornecido
  const jwt = new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }) // Define o algorítimo usado para criptografia
    .setIssuedAt() // Define o horário de emissão do JWT para o horário atual
    .setExpirationTime('7d'); // Define o tempo de expiração da session

  // Assina o JWT com a chave secreta fornecida e retorna um JWT como string
  return jwt.sign(SESSION_CONFIG.encodedKey);
}
