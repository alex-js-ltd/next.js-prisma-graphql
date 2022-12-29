import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { req } from './request.client'

import { graphql } from 'generated/gql'
import type { ListItemInput } from 'generated/graphql'

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

    onSuccess(data) {
      console.log(data)
    },
  })
}

export { useCreateListItem }
