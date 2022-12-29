import { MutationResolvers } from './types.generated.server'
import { prisma } from 'utils/prisma.server'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import type { UserSession } from './types.generated.server'

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

    ctx.req.session.user = userSession(user)
    await ctx.req.session.save()

    return ctx.req.session.user
  },

  async login(_parent, args, ctx) {
    const { email, password } = args

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user && bcrypt.compareSync(password, user?.password)) {
      ctx.req.session.user = userSession(user)
      await ctx.req.session.save()
      return ctx.req.session.user
    }

    return null
  },

  async logout(_parent, _args, ctx) {
    ctx.req.session.destroy()

    return null
  },
}

export default Mutation

function userSession(user: User | null): UserSession {
  return {
    id: user?.id,
    email: user?.email,
  }
}
