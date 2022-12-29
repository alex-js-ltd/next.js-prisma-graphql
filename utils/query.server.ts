import { QueryResolvers } from './types.generated.server'

const Query: QueryResolvers = {
  async books(_parent, args, ctx) {
    const { query } = args

    if (!ctx.req.session.user) return null

    const books = await ctx.prisma.book.findMany({
      where: {
        title: {
          startsWith: query?.toString(),
          mode: 'insensitive',
        },
      },
    })

    return books
  },

  async user(_parent, _args, ctx) {
    const user = ctx.req.session.user

    return user ? user : null
  },

  async listItems(_parent, args, ctx) {
    if (!ctx.req.session.user) return null

    const { userId } = args

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        listItems: true,
      },
    })

    return user?.listItems ? user.listItems : null
  },
}

export default Query
