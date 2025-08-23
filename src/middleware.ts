import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

import { GUEST_ROUTES, PUBLIC_ROUTES } from '@/shared/config/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const pathname = req.nextUrl.pathname

  const isApiRoute = pathname.startsWith('/api/auth')
  const isGuestRoute = GUEST_ROUTES.includes(pathname)
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

  if (isApiRoute) {
    return null
  }

  if (isGuestRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/settings', req.url))
    }
    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', req.url))
  }

  return null
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
