import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const protectedRoutes = ['/dashboard', '/apply', '/admin'];
  const authRoutes = ['/login', '/register'];

  const { pathname } = request.nextUrl;

  // EXCLUDE /admin/login from the redirect logic to prevent infinite loop
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // If trying to access admin route without token or with user token
  if (pathname.startsWith('/admin') && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If trying to access protected route without token
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If trying to access auth routes with valid token
  if (authRoutes.some(route => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/apply/:path*', '/admin/:path*', '/login', '/register'],
};
