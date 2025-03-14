import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Skip middleware for API routes and static assets
  if (
    req.nextUrl.pathname.startsWith('/api/') ||
    req.nextUrl.pathname.startsWith('/_next/') ||
    req.nextUrl.pathname.includes('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const session = await getSession(req, res);
  const isLoggedIn = !!session?.user;
  const isLoginPage = req.nextUrl.pathname === '/login';

  // If user is not logged in and not on login page, redirect to login
  if (!isLoggedIn && !isLoginPage) {
    console.log('Redirecting to login page');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If user is logged in and on login page, redirect to home
  if (isLoggedIn && isLoginPage) {
    console.log('Redirecting to home page');
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

// Update the matcher to be more specific
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (Auth0 authentication routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}; 