import jwt from 'jsonwebtoken'
import { prisma } from './prisma'
import { isError } from './isError'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'

type Handler = (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User,
) => unknown | Promise<unknown>

const validateRoute = (handler: Handler) => {
  return async (req: NextApiRequest, res: NextApiResponse<Handler | Error>) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN

    if (token) {
      let user

      try {
        const { id }: any = jwt.verify(token, 'hello')

        user = await prisma.user.findUnique({
          where: { id },
        })

        if (!user) {
          throw new Error('Not real user')
        }
      } catch (error) {
        res.status(401)
        res.json(isError(error))
        return
      }

      return handler(req, res, user)
    }

    res.status(401)
    res.json(new Error('Not Authorized'))
  }
}

const validateToken = (token: string) => {
  const user = jwt.verify(token, 'hello')
  return user
}

export { validateRoute, validateToken }
