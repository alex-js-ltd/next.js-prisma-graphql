import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { req } from './request.client'
import { graphql } from 'generated/gql'
import type {
  ListItemInput,
  QueryListItemsArgs,
  Book,
  ListItem,
} from 'generated/graphql'
import { useUser } from './auth.client'

const createDocument = graphql(/* GraphQL */ `
  mutation createListItem($listItemInput: ListItemInput!) {
    createListItem(listItemInput: $listItemInput)
  }
`)

function useCreateListItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (listItemInput: ListItemInput) =>
      req(createDocument, { listItemInput }),

    onSuccess() {
      queryClient.invalidateQueries(['list-items'])
    },
  })
}

const listItemsDocument = graphql(/* GraphQL */ `
  query listItems($userId: Int!) {
    listItems(userId: $userId) {
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
  const user = useUser()
  const result = useQuery<{ listItems: ListItem[] }, Error>({
    queryKey: ['list-items'],
    queryFn: async () => req(listItemsDocument, { userId: user?.id }),
  })

  return result?.data?.listItems
}

function useListItem(book: Book) {
  const listItems = useListItems()

  return listItems?.find((li: ListItem) => li.id === book.id) ?? null
}

export { useCreateListItem, useListItems, useListItem }
