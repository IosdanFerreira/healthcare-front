import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decryptSession } from '@/lib/session';

// 1. Specify protected and public routes=
const publicRoutes = ['/', '/cadastre'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value;
  const session = await decryptSession(cookie);

  // 4. Redirect to /login if the user is not authenticated
  if (!isPublicRoute && !session?.access_token) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && session?.access_token) {
    return NextResponse.redirect(new URL(`/patients/${session.user_id}/new-appointment`, req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/', '/cadastre', '/patients/:path*'],
};
