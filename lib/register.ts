import request from 'graphql-request'
import { useMutation } from '@tanstack/react-query'
import { graphql } from 'generated/gql'
import { MutationRegisterArgs } from 'generated/graphql'
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
