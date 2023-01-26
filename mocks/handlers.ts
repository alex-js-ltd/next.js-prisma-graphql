import { graphql } from 'msw'
import { booksQueryDocument } from 'utils/books.client'
import { books } from './mock-data'

const handlers = [
  graphql.query(booksQueryDocument, (req, res, ctx) => {
    return res(
      ctx.data({
        books,
      }),
    )
  }),
]

export { handlers }
