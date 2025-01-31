import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decryptSession } from '../session';

/**
 * Faz uma solicitação fetch do lado do servidor, adicionando o token de acesso aos cabeçalhos.
 */
export async function fetchServer(url: URL | string, init?: RequestInit | undefined): Promise<Response> {
  const session = (await cookies()).get('session')?.value;
  const payload = await decryptSession(session);

  // Faz a requisição com fetch, adicionando o token de acesso aos cabeçalhos
  const response = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      ...(payload?.access_token && { Authorization: `Bearer ${payload.access_token}` }),
    },
  });

  // // Se a resposta for 401(unauthorized), redireciona para a página de login
  // if (response.status === 401) {
  //   redirect('/');
  // }

  return response;
}
