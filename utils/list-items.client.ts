import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { req } from './request.client'
import { graphql } from 'generated/gql'
import type { ListItemInput, QueryListItemsArgs } from 'generated/graphql'

const createDocument = graphql(/* GraphQL */ `
  mutation createListItem($listItemInput: ListItemInput!) {
    createListItem(listItemInput: $listItemInput)
  }
`)

function useCreateListItem() {
  return useMutation({
    mutationFn: (listItemInput: ListItemInput) =>
      req(createDocument, { listItemInput }),

    onSuccess(data) {
      console.log(data)
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
  const result = useMutation({
    mutationFn: (userId: QueryListItemsArgs) =>
      req(listItemsDocument, { userId }),

    onSuccess(data) {
      console.log(data)
    },
  })

  return result?.data.listItems
}

export { useCreateListItem, useListItems }
