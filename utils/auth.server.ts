import { GraphQLError } from 'graphql'
import type { ResolverFn } from './types.generated.server'

import type { Context } from 'pages/api/graphql'

type Resolver<TResult, TParent, TArgs> = ResolverFn<
  TResult,
  TParent,
  Context,
  TArgs
>

const authenticated =
  <TResult, TParent, TArgs>(
    next: Resolver<TResult, TParent, TArgs>,
  ): Resolver<TResult, TParent, TArgs> =>
  (parent, args, ctx, info) => {
    if (!ctx?.req.session?.user?.id)
      throw new GraphQLError('you must be logged in to query this schema', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      })

    return next(parent, args, ctx, info)
  }

export { authenticated }
