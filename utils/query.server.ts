import { Context } from 'pages/api/graphql'
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

    const listItems = await getListItems(ctx)

    const bookIds = listItems?.map(li => li.bookId)

    return books?.filter(b => !bookIds?.includes(b.id)) ?? []
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

    return book
  },

  async user(_parent, _args, ctx) {
    const user = ctx.req.session.user

    return user ? user : null
  },

  async listItems(_parent, _args, ctx) {
    return await getListItems(ctx)
  },
}

export default Query

async function getListItems(ctx: Context) {
  const id = ctx?.req?.session?.user?.id

  if (!id) return null

  const user = await ctx.prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      listItems: true,
    },
  })

  return user?.listItems ?? null
}
