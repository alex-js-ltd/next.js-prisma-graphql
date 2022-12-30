import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { req } from './request.client'
import { graphql } from 'generated/gql'
import type { CreateListItemInput, Book, ListItem } from 'generated/graphql'
import { useUser } from './auth.client'

const createDocument = graphql(/* GraphQL */ `
  mutation createListItem($listItemInput: CreateListItemInput!) {
    createListItem(listItemInput: $listItemInput)
  }
`)

function useCreateListItem(book: Book) {
  const queryClient = useQueryClient()

  const { id, ...rest } = book

  const listItemInput: CreateListItemInput = { bookId: id, ...rest }
  return useMutation({
    mutationFn: () => req(createDocument, { listItemInput }),

    onSuccess() {
      queryClient.invalidateQueries(['list-items'])
    },
  })
}

const listItemsDocument = graphql(/* GraphQL */ `
  query listItems {
    listItems {
      bookId
      id
      title
      author
      coverImageUrl
      publisher
      synopsis
      pageCount
      startDate
      finishDate
      rating
    }
  }
`)

function useListItems() {
  const result = useQuery<{ listItems: ListItem[] }, Error>({
    queryKey: ['list-items'],
    queryFn: async () => req(listItemsDocument),
  })

  return result?.data?.listItems ?? []
}

function useListItem(book: Book) {
  const listItems = useListItems()

  return listItems?.find((li: ListItem) => li.bookId === book.id) ?? null
}

export { useCreateListItem, useListItems, useListItem }
