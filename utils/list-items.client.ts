import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { req } from './request.client'

import { graphql } from 'generated/gql'
import type { ListItemInput } from 'generated/graphql'

const createDocument = graphql(/* GraphQL */ `
  mutation createListItem($listItem: ListItemInput!, $userId: Int!) {
    createListItem(listItem: $listItem, userId: $userId)
  }
`)

type Props = { listItemInput: ListItemInput; userId: number }

function useCreateListItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ listItemInput, userId }: Props) =>
      req(createDocument, { listItemInput, userId }),

    onSuccess(data) {
      console.log(data)
    },
  })
}

export { useCreateListItem }
