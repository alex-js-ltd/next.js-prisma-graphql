import { QueryResolvers } from './types.generated.server'

const Query: QueryResolvers = {
  async books(_parent, args, ctx) {
    const { query } = args

    if (!ctx.user) return null

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
    if (!ctx.user) return null

    return ctx.user
  },
}

export default Query
