import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { req } from './request.client'

function useCreateListItem() {
  const queryClient = useQueryClient()

  //   return useMutation({
  //     mutationFn: (listItem: any) => console.log('hello')

  //     async onSettled() {
  //       await queryClient.invalidateQueries(['list-items'])
  //     },
  //   })

  return null
}

export { useCreateListItem }
