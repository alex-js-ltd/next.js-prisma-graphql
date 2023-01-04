import { Context } from 'pages/api/graphql'
import { QueryResolvers } from './types.generated.server'
import { authenticated } from './auth.server'

const Query: QueryResolvers = {
  books: authenticated(async (_parent, args, ctx) => {
    const { query } = args

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
  }),

  book: authenticated(async (_parent, args, ctx) => {
    const { id } = args

    if (!id) return null

    const book = await ctx.prisma.book.findUnique({
      where: {
        id,
      },
    })

    return book
  }),

  async user(_parent, _args, ctx) {
    const user = ctx.req.session.user

    return user ? user : null
  },

  listItems: authenticated(async (_parent, args, ctx) => {
    return await getListItems(ctx)
  }),
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
