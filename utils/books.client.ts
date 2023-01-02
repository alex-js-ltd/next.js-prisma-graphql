import { req } from './request.client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { graphql } from 'generated/gql'
import type { Book } from 'generated/graphql'
import bookPlaceholderSvg from 'public/book-placeholder.svg'

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

function useBook(id: string | string[] | undefined) {
  const bookId = Number(id)

  const result = useQuery<{ book: Book }, Error>({
    queryKey: ['book', bookId],
    queryFn: () => req(bookQueryDocument, { bookId }),
  })

  return result?.data?.book ?? loadingBook
}

export { useBooks, useBook }

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

const bookQueryDocument = graphql(/* GraphQL */ `
  query book($bookId: Int) {
    book(id: $bookId) {
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

const loadingBook = {
  id: 0,
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  pageCount: 0,
  loadingBook: true,
}
