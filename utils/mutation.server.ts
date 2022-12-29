import { MutationResolvers } from './types.generated.server'
import { prisma } from 'utils/prisma.server'
import bcrypt from 'bcrypt'
import { User } from 'generated/graphql'

const Mutation: MutationResolvers = {
  async register(_parent, args, ctx) {
    const salt = bcrypt.genSaltSync()
    const { email, password } = args

    const user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    })

    const u = getUser(user)

    ctx.req.session.user = u
    await ctx.req.session.save()

    return u
  },

  async login(_parent, args, ctx) {
    const { email, password } = args

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    const u = getUser(user)

    if (user && bcrypt.compareSync(password, user.password)) {
      ctx.req.session.user = u
      await ctx.req.session.save()
    }

    return u
  },

  async logout(_parent, args, ctx) {
    ctx.req.session.destroy()

    return null
  },

  async createListItem(_parent, args, ctx) {
    const user = ctx.req.session.user

    if (!user) return null

    const { listItem } = args

    //const find = ctx.req.session.user.find

    return null
  },
}

export default Mutation

function getUser(user?: User | null) {
  return { id: user?.id, email: user?.email, listItems: user?.listItems }
}
