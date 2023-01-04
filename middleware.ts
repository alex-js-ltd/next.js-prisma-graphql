import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session/edge'
import { sessionOptions } from 'utils/session.server'

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()
  const session = await getIronSession(req, res, sessionOptions)

  // do anything with session here:
  const { user } = session

  console.log('from middleware', { user })

  if (!user?.email) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/books:path*',
    '/book:path*',
    '/reading-list:path*',
    '/finished:path*',
  ],
}
