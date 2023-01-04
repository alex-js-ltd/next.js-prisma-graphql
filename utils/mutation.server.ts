import { MutationResolvers } from './types.generated.server'
import { prisma } from 'utils/prisma.server'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { authenticated } from './auth.server'

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

  createListItem: authenticated(async (_parent, args, ctx) => {
    const { listItemInput } = args
    const { bookId, ...rest } = listItemInput

    const user = await prisma.listItem.create({
      data: {
        ...rest,
        User: {
          connect: { id: ctx?.req?.session?.user?.id },
        },
        Book: {
          connect: { id: bookId },
        },
      },
    })

    return 'list item created'
  }),

  updateListItem: authenticated(async (_parent, args, ctx) => {
    const { listItemInput } = args
    const { id, bookId, ...rest } = listItemInput

    const update = await prisma.listItem.update({
      where: { id },
      data: { ...rest },
    })
    return 'update list item'
  }),

  removeListItem: authenticated(async (_parent, args, ctx) => {
    const { id } = args

    const remove = await prisma.listItem.delete({
      where: {
        id,
      },
    })

    return 'list item removed'
  }),
}

export default Mutation

function userSession(user: User | null) {
  return {
    id: user?.id,
    email: user?.email,
  }
}
