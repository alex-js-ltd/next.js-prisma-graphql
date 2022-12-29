import { QueryResolvers } from './types.generated.server'

const Query: QueryResolvers = {
  async books(_parent, args, ctx) {
    const { query } = args

    if (!ctx.req.session.user) return null

    console.log('user  session', ctx.req.session.user)
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
}

export default Query
