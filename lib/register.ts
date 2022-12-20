import request from 'graphql-request'
import { useMutation } from '@tanstack/react-query'
import { graphql } from 'graphql/client/gql'
import { MutationRegisterArgs } from 'graphql/client/graphql'
import { useRouter } from 'next/router'

const registerMutationDocument = graphql(/* GraphQL */ `
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      createdAt
      email
      id
      password
      updatedAt
    }
  }
`)

function useRegister() {
  const router = useRouter()

  return useMutation({
    mutationFn: ({ email, password }: MutationRegisterArgs) =>
      request('http://localhost:3000/api/graphql', registerMutationDocument, {
        email,
        password,
      }),

    onSuccess(data) {
      console.log(data)

      router.push('/books')
    },
  })
}
export { useRegister }
