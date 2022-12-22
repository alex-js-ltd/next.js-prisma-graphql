import { QueryResolvers } from './resolvers-types.generated'

const Query: QueryResolvers = {
  async books(_parent, args, ctx) {
    const { query } = args

    console.log('query', query)
    const books = await ctx.prisma.book.findMany({
      where: {
        title: {
          startsWith: query?.toString(),
          mode: 'insensitive',
        },
      },
    })
    console.log(books)
    return books
  },
}

export default Query
