import { COOKIE_NAME } from '@/core/lib/constants'
import { actionGetSession } from '@/features/auth/actions'
import type { ISession } from '@/features/auth/types'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware (request: NextRequest): Promise<NextResponse> {
  try {
    // Verificar si existe el token de autenticación
    const token = request.cookies.get(COOKIE_NAME)?.value
    if (!token) {
      return redirectToLogin(request)
    }

    // Obtener la sesión del usuario
    const sessionResponse = await actionGetSession()
    const session = sessionResponse?.data as ISession

    // Validar sesión y permisos de administrador
    if (!isValidAdminSession(session)) {
      return redirectToLogin(request)
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return redirectToLogin(request)
  }
}

function isValidAdminSession (session: ISession | null): boolean {
  if (!session?.User) {
    return false
  }

  const authorities = session.User.authorities
  if (!Array.isArray(authorities)) {
    return false
  }

  return authorities.some(auth => auth?.authority === 'ROLE_ADMIN' || auth.authority === 'admin')
}

function redirectToLogin (request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/admin/:path*']
}
