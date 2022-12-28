import { Resolvers } from './server.types.generated'
import Query from './server.query'
import Mutation from './server.mutation'

const resolvers: Resolvers = {
  Query,
  Mutation,
}

export default resolvers
