import type { ResolverFn } from './types.generated.server'
import type { Context } from 'pages/api/graphql'
import { GraphQLError } from 'graphql'

type Resolver = ResolverFn<any, any, Context, any>

const authenticated =
  (next: Resolver): Resolver =>
  (parent, args, ctx, info) => {
    if (!ctx.req.session.user?.id) {
      throw new GraphQLError('You are not authorized to perform this action.', {
        extensions: {
          code: 'FORBIDDEN',
        },
      })
    }

    return next(parent, args, ctx, info)
  }

export { authenticated }
