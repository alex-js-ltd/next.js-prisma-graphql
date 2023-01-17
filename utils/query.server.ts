import { QueryResolvers } from './types.generated.server'
import { authenticated } from './auth.server'
import { PrismaClient } from '@prisma/client'

const Query: QueryResolvers = {
  books: authenticated(async (_parent, args, ctx) => {
    const { query } = args

    let books

    books = await ctx.prisma.book.findMany({
      where: {
        title: {
          startsWith: query?.toString(),
          mode: 'insensitive',
        },
      },
    })

    const id = Number(ctx?.req?.session?.user?.id)
    const prisma = ctx.prisma

    const listItems = await getListItems(id, prisma)

    const bookIds = listItems?.map(li => li.bookId)

    const userBooks = books?.filter(b => !bookIds?.includes(b.id)) ?? []

    return userBooks
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

  user: authenticated(async (_parent, _args, ctx) => {
    return ctx.req?.session?.user ?? null
  }),

  listItems: authenticated(async (_parent, _args, ctx) => {
    const id = Number(ctx?.req?.session?.user?.id)
    const prisma = ctx.prisma
    return await getListItems(id, prisma)
  }),
}

export default Query

export async function getListItems(id: number, prisma: PrismaClient) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      listItems: true,
    },
  })

  return user?.listItems ?? null
}
