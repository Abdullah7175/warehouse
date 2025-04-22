import { NextResponse } from 'next/server';
import { verifyToken } from './auth';

const publicPaths = [
  '/',
  '/products',
  '/about',
  '/contact',
  '/auth/login',
  '/auth/register'
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken')?.value;

  // Skip middleware for public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Redirect to login if no token
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('authToken');
    return response;
  }

  // Check admin routes
  if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
    return NextResponse.redirect(new URL('/auth/unauthorized', request.url));
  }

  // Add other role checks as needed
  // ...

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};