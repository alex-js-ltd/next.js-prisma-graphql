import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { req } from './request.client'
import { graphql } from 'generated/gql'
import type { ListItemInput, Book, ListItem } from 'generated/graphql'
import { useUser } from './auth.client'

const createDocument = graphql(/* GraphQL */ `
  mutation createListItem($listItemInput: ListItemInput!) {
    createListItem(listItemInput: $listItemInput)
  }
`)

function useCreateListItem(book: Book) {
  const queryClient = useQueryClient()

  const { id, ...rest } = book
  const user = useUser()

  const listItemInput: ListItemInput = { userId: user?.id, ...rest }
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
  console.log('listItems', result?.data)
  return result?.data?.listItems ?? []
}

function useListItem(book: Book) {
  const listItems = useListItems()

  return listItems?.find((li: ListItem) => li.title === book.title) ?? null
}

export { useCreateListItem, useListItems, useListItem }
