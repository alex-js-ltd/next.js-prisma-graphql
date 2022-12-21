import { req } from './request'
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

const logoutMutationDocument = graphql(/* GraphQL */ `
  mutation logout {
    logout {
      id
      createdAt
      updatedAt
      email
      password
    }
  }
`)

type Props = MutationLoginArgs | MutationRegisterArgs

function useAuth(document: RequestDocument) {
  const router = useRouter()

  return useMutation({
    mutationFn: ({ email, password }: Props) =>
      req(document, {
        email,
        password,
      }),

    onSuccess(data) {
      console.log(data)

      router.push('/books')
    },
  })
}

function useLogout() {
  const router = useRouter()

  return useMutation({
    mutationFn: () => req(logoutMutationDocument),

    onSuccess(data) {
      console.log(data)
      router.push('/')
    },
  })
}

export { useAuth, useLogout }
