import request from 'graphql-request'
import { useMutation } from '@tanstack/react-query'
import { graphql } from 'generated/gql'
import type { MutationRegisterArgs, MutationLoginArgs } from 'generated/graphql'
import { useRouter } from 'next/router'
import type { RequestDocument } from 'graphql-request'

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

const loginMutationDocument = graphql(/* GraphQL */ `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      createdAt
      email
      id
      password
      updatedAt
    }
  }
`)

function useAuth(document: RequestDocument) {
  const router = useRouter()

  return useMutation({
    mutationFn: ({
      email,
      password,
    }: MutationRegisterArgs | MutationLoginArgs) =>
      request('http://localhost:3000/api/graphql', document, {
        email,
        password,
      }),

    onSuccess(data) {
      console.log(data)

      router.push('/books')
    },
  })
}
export { useAuth }
