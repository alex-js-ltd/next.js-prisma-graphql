import { Resolvers } from './types.generated.server'
import Query from './query.server'
import Mutation from './mutation.server'

const resolvers: Resolvers = {
  Query,
  Mutation,
}

export default resolvers
