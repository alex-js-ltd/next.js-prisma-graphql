import { QueryResolvers } from './resolvers-types.generated'

const Query: QueryResolvers = {
  async books(_parent, _args, ctx) {
    if (ctx.user) {
      return ctx.prisma.book.findMany()
    }

    return null
  },
}

export default Query
