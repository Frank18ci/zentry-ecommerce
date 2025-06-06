import { COOKIE_NAME } from '@/core/lib/constants'
import { NextRequest, NextResponse } from 'next/server'

export function middleware (request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value

  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // TODO: Add role verification here when needed
    // For now, we'll assume any authenticated user can access admin
    // In a real implementation, you'd verify the JWT token and check for ADMIN role
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
