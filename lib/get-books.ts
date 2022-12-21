import { req } from './request'
import { useQuery } from '@tanstack/react-query'
import { graphql } from 'generated/gql'

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
  return useQuery({
    queryKey: ['books'],
    queryFn: async () => req(booksQueryDocument),
  })
}
export { useBooks }
