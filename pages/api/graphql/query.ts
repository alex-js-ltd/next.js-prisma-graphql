import { QueryResolvers } from './resolvers-types.generated'

const Query: QueryResolvers = {
  async books(_parent, _args, ctx) {
    return ctx.prisma.book.findMany()
  },
}

export default Query
