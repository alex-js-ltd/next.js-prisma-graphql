import { req } from './request.client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { graphql } from 'generated/gql'
import type { Book } from 'generated/graphql'

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
  const queryClient = useQueryClient()

  const result = useQuery<{ book: Book }, Error>({
    queryKey: ['book', bookId],
    queryFn: () => req(bookQueryDocument, { bookId }),

    initialData: () => {
      return queryClient.getQueryData(['book', bookId])
    },
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

const bookPlaceholderSvg =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='400px' height='600px' viewBox='0 0 400 600' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EBook Placeholder%3C/title%3E%3Cdefs%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='linearGradient-1'%3E%3Cstop stop-color='%23E6E7EE' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%23E2E4EC' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Group-10'%3E%3Cg id='Group-9'%3E%3Cg id='Group-8'%3E%3Cpath d='M3,0 L397,0 C398.656854,-3.04359188e-16 400,1.34314575 400,3 L400,584 L400,584 L0,584 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 Z' id='Combined-Shape' fill='%23F1F2F7'%3E%3C/path%3E%3Cpath d='M381.643484,598.685213 L400,584 L400,584 L0,584 L18.3565161,598.685213 C19.4203944,599.536315 20.7422574,600 22.1046864,600 L377.895314,600 C379.257743,600 380.579606,599.536315 381.643484,598.685213 Z' id='Path-9' fill='url(%23linearGradient-1)'%3E%3C/path%3E%3C/g%3E%3Crect id='Rectangle' fill='%23E2E4EB' opacity='0.5' x='50' y='154' width='300' height='42' rx='5'%3E%3C/rect%3E%3Crect id='Rectangle' fill='%23E2E4EB' opacity='0.5' x='50' y='214' width='300' height='42' rx='5'%3E%3C/rect%3E%3Crect id='Rectangle' fill='%23E2E4EB' opacity='0.5' x='50' y='515' width='300' height='26' rx='5'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E"

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
