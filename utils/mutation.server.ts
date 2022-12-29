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
    const { listItem, userId } = args

    const listItems = await useListItems(userId)

    if (listItems) return null

    try {
      const updateUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          listItems: {
            connect: [listItem],
          },
        },
      })
      console.log('update user', updateUser)
    } catch (error) {
      console.log(error)

      return 'whoops'
    }

    return 'cool'
  },
}

export default Mutation

function userSession(user: User | null) {
  return {
    id: user?.id,
    email: user?.email,
  }
}

async function useListItems(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      listItems: true,
    },
  })

  return user?.listItems
}
