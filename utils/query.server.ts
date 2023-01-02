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

  async book(_parent, args, ctx) {
    if (!ctx.req.session.user) return null

    const { id } = args

    if (!id) return null

    const book = await ctx.prisma.book.findUnique({
      where: {
        id,
      },
    })

    console.log(book)

    return book
  },

  async user(_parent, _args, ctx) {
    const user = ctx.req.session.user

    return user ? user : null
  },

  async listItems(_parent, _args, ctx) {
    if (!ctx.req.session.user?.id) return null

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.req.session.user.id,
      },
      include: {
        listItems: true,
      },
    })

    return user?.listItems ?? null
  },
}

export default Query
