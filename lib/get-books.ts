import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
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
`
