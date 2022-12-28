import { req } from './request.client'
import { useQuery } from '@tanstack/react-query'
import { graphql } from 'generated/gql'
import type { Book } from 'generated/graphql'

const booksQueryDocument = graphql(/* GraphQL */ `
  query books($query: String) {
    books(query: $query) {
      id
      author
      coverImageUrl
      pageCount
      publisher
      synopsis
      title
    }
  }
`)

function fetchBooks(query?: string | null) {
  return req(booksQueryDocument, { query })
}

function useBooks(query: string | null) {
  const result = useQuery<{ books: Book[] }, Error>({
    queryKey: ['books', query],
    queryFn: async () => fetchBooks(query),
  })

  return { ...result, books: result?.data?.books ?? [] }
}
export { useBooks, fetchBooks }
