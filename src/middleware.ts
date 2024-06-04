import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'
  const isProtectedPath = path === '/profile'
  const token = request.cookies.get("token")?.value || ''

  // If the user is trying to access a public page and they are logged in, redirect to profile page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  // If the user is trying to access a protected page and they are not logged in, redirect to login page
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If the user is logging out, clear the token and redirect to login page
  if (path === '/logout') {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.set('token', '', { maxAge: -1 })
    return response
  }

  // If the user is accessing the main page and they are logged in, allow access
  if (path === '/' && token) {
    return NextResponse.next()
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/verifyemail',
    '/login',
    '/signup',
    '/logout'
  ],
}
