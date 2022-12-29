import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { req } from './request.client'

import { graphql } from 'generated/gql'
import type { ListItemInput } from 'generated/graphql'

const createDocument = graphql(/* GraphQL */ `
  mutation createListItem($listItem: ListItemInput!, $id: Int!) {
    createListItem(listItem: $listItem, id: $id) {
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

type Props = { listItem: ListItemInput; id: number }

function useCreateListItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ listItem, id }: Props) =>
      req(createDocument, { listItem, id }),

    onSuccess(data) {
      console.log(data)
    },
  })
}

export { useCreateListItem }
