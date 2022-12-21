import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('ACCESS_TOKEN')?.value

  // redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (token) {
    return NextResponse.next()
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/books/:path*'],
}
