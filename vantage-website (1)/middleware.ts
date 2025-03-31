import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Don't apply middleware to the admin login page itself
  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.next()
  }
  
  // Only check auth for admin dashboard routes
  if (request.nextUrl.pathname.startsWith('/admin/dashboard') || 
      request.nextUrl.pathname.startsWith('/admin/blog')) {
    // Check for token in cookies
    const token = request.cookies.get('admin_token')?.value
    
    if (!token) {
      // If no token found, redirect to login page
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }
  
  return NextResponse.next()
}

// Apply middleware only to admin routes
export const config = {
  matcher: ['/admin/:path*'],
} 