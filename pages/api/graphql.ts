import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { prisma } from 'utils/prisma.server'
import { readFileSync } from 'fs'
import resolvers from 'utils/resolvers.server'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'utils/session.server'
import type { PrismaClient } from '@prisma/client'
import type { NextApiResponse, NextApiRequest } from 'next'

export type Context = {
  prisma: PrismaClient
  res: NextApiResponse
  req: NextApiRequest
}

const typeDefs = readFileSync('next.js-prisma-graphql' + './schema.graphql', {
  encoding: 'utf-8',
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res): Promise<Context> => {
    return { prisma, res, req }
  },
})

export default withIronSessionApiRoute(handler, sessionOptions)
