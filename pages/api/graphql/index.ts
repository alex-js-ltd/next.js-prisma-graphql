import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { prisma } from 'lib/prisma'
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import resolvers from './resolvers'
import jwt from 'jsonwebtoken'
import type { NextApiResponse } from 'next'
import type { User } from '@prisma/client'

export type Context = {
  prisma: PrismaClient
  res: NextApiResponse
  user?: User | null
}

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

export default startServerAndCreateNextHandler(server, {
  context: async (req, res): Promise<Context> => {
    const token = req.cookies.ACCESS_TOKEN || ''
    const user = await getUser(token)
    return { prisma, res, user }
  },
})

async function getUser(token: string) {
  const { id }: any = jwt.verify(token, 'hello')

  const user = await prisma.user.findUnique({
    where: { id },
  })

  return user
}
