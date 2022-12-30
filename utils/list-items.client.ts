import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { req } from './request.client'
import { graphql } from 'generated/gql'
import type {
  CreateListItemInput,
  UpdateListItemInput,
  Book,
  ListItem,
} from 'generated/graphql'
import { formatDate } from './format-date.client'

const createDocument = graphql(/* GraphQL */ `
  mutation createListItem($listItemInput: CreateListItemInput!) {
    createListItem(listItemInput: $listItemInput)
  }
`)

const removeDocument = graphql(/* GraphQL */ `
  mutation removeListItem($removeListItemId: Int!) {
    removeListItem(id: $removeListItemId)
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

function useRemoveListItem(listItem: ListItem | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => req(removeDocument, { removeListItemId: listItem?.id }),

    onSuccess() {
      queryClient.invalidateQueries(['list-items'])
    },
  })
}

function useUpdateListItem(listItem: ListItem) {
  const queryClient = useQueryClient()
  const date = new Date(Date.now()).toISOString()

  const listItemInput: UpdateListItemInput = { ...listItem }

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

function useListItem(element: any) {
  const listItems = useListItems()

  if (isListItem(element)) {
    return (
      listItems?.find((li: ListItem) => li.bookId === element.bookId) ?? null
    )
  }

  return listItems?.find((li: ListItem) => li.bookId === element.id) ?? null
}

export {
  useCreateListItem,
  useListItems,
  useListItem,
  useRemoveListItem,
  useUpdateListItem,
}

function isListItem(valueToTest: any) {
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    'bookId' in valueToTest &&
    typeof valueToTest['bookId'] === 'number'
  )
}
