import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { prisma } from 'utils/server.prisma'
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import resolvers from 'utils/server.resolvers'
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
  let user
  try {
    const { id }: any = jwt.verify(token, 'hello')
    user = await prisma.user.findUnique({
      where: { id },
    })
  } catch (error) {}

  return user ? user : null
}
