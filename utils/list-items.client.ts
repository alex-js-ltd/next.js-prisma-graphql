import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { req } from './request.client'
import { graphql } from 'generated/gql'
import type {
  CreateListItemInput,
  UpdateListItemInput,
  Book,
} from 'generated/graphql'
import type { ListItem } from '@prisma/client'

export {
  useCreateListItem,
  useListItems,
  useListItem,
  useRemoveListItem,
  useUpdateListItem,
}

const useCreateListItem = (book: Book) => {
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

const useUpdateListItem = () => {
  const queryClient = useQueryClient()

  return useMutation<ListItem, Error, UpdateListItemInput>({
    mutationFn: (listItemInput: UpdateListItemInput) =>
      req(updateDocument, { listItemInput }),

    onSuccess() {
      queryClient.invalidateQueries(['list-items'])
    },
  })
}

const useRemoveListItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (removeListItemId?: number) =>
      req(removeDocument, { removeListItemId }),

    onSuccess() {
      queryClient.invalidateQueries(['list-items'])
    },
  })
}

const useListItems = () => {
  const result = useQuery<{ listItems: ListItem[] }, Error>({
    queryKey: ['list-items'],
    queryFn: async () => req(listItemsDocument),
  })

  return result?.data?.listItems ?? []
}

const useListItem = (element: any) => {
  const listItems = useListItems()

  if (isListItem(element)) {
    return (
      listItems?.find((li: ListItem) => li.bookId === element.bookId) ?? null
    )
  }

  return listItems?.find((li: ListItem) => li.bookId === element.id) ?? null
}

const createDocument = graphql(/* GraphQL */ `
  mutation createListItem($listItemInput: CreateListItemInput!) {
    createListItem(listItemInput: $listItemInput)
  }
`)

const updateDocument = graphql(/* GraphQL */ `
  mutation updateListItem($listItemInput: UpdateListItemInput!) {
    updateListItem(listItemInput: $listItemInput)
  }
`)

const removeDocument = graphql(/* GraphQL */ `
  mutation removeListItem($removeListItemId: Int!) {
    removeListItem(id: $removeListItemId)
  }
`)

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
      notes
    }
  }
`)

function isListItem(valueToTest: any) {
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    'bookId' in valueToTest &&
    typeof valueToTest['bookId'] === 'number'
  )
}
