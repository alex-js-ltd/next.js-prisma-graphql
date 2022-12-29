import { MutationResolvers } from './types.generated.server'
import { prisma } from 'utils/prisma.server'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { GraphQLError } from 'graphql'

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

  async createListItem(_parent, args, ctx) {
    if (!ctx.req.session.user) return null

    const { listItemInput } = args
    const { userId, ...rest } = listItemInput

    if (!userId) return null

    const user = await prisma.listItem.create({
      data: {
        ...rest,
        User: {
          connect: { id: userId },
        },
      },
    })

    return 'list item created'
  },

  async updateListItem(_parent, args, ctx) {
    if (!ctx.req.session.user) return null

    const { listItemInput } = args
    const { userId, ...rest } = listItemInput

    if (!userId) return null

    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: 'Viola the Magnificent',
      },
    })

    return 'list item created'
  },
}

export default Mutation

function userSession(user: User | null) {
  return {
    id: user?.id,
    email: user?.email,
  }
}
