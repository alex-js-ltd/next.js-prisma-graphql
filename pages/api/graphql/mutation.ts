import { MutationResolvers } from './resolvers-types.generated'
import { prisma } from 'lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

const Mutation: MutationResolvers = {
  async register(_parent, args, ctx) {
    const salt = bcrypt.genSaltSync()
    const { email, password } = args

    const user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    })

    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        time: Date.now(),
      },
      'hello',
      { expiresIn: '8h' },
    )

    ctx.res.setHeader(
      'Set-Cookie',
      cookie.serialize('ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      }),
    )

    return user
  },

  async login(_parent, args, ctx) {
    const { email, password } = args

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          time: Date.now(),
        },
        'hello',
        {
          expiresIn: '8h',
        },
      )

      ctx.res.setHeader(
        'Set-Cookie',
        cookie.serialize('ACCESS_TOKEN', token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        }),
      )

      return user
    }

    return null
  },

  async logout(_parent, args, ctx) {
    ctx.res.setHeader(
      'Set-Cookie',
      cookie.serialize('ACCESS_TOKEN', '', {
        httpOnly: true,
        maxAge: 0,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now()),
      }),
    )

    return null
  },
}

export default Mutation
