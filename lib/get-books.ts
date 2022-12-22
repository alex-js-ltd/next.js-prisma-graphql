import { req } from './request'
import { useQuery } from '@tanstack/react-query'
import { graphql } from 'generated/gql'
import type { Book } from '@prisma/client'

const booksQueryDocument = graphql(/* GraphQL */ `
  query getBooks {
    books {
      id
      title
      author
      coverImageUrl
      publisher
      synopsis
      pageCount
    }
  }
`)

function useBooks() {
  return useQuery<Book[], Error>({
    queryKey: ['books'],
    queryFn: async () => req(booksQueryDocument),
  })
}
export { useBooks }
