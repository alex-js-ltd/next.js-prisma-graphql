import { req } from './request'
import { useQuery } from '@tanstack/react-query'
import { graphql } from 'generated/gql'
import type { Book } from 'generated/graphql'

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
  const result = useQuery<any, Error>({
    queryKey: ['books'],
    queryFn: async () => req(booksQueryDocument),
  })

  return { ...result, books: result?.data?.books ?? [] }
}
export { useBooks }
