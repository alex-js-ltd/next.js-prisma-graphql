import { req } from './request.client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
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

function useBooks(query: string) {
  const queryClient = useQueryClient()

  const result = useQuery<{ books: Book[] }, Error>({
    queryKey: ['books', query],
    queryFn: async () => req(booksQueryDocument, { query }),

    onSuccess(data) {
      if (!data) return

      for (const book of data.books) {
        queryClient.setQueryData(['book', book.id], book)
      }
    },
  })

  return { ...result, books: result?.data?.books ?? [] }
}
export { useBooks }
