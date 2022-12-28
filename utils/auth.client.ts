import { req } from './request.client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { graphql } from 'generated/gql'
import { useRouter } from 'next/router'
import type {
  MutationRegisterArgs,
  MutationLoginArgs,
  User,
} from 'generated/graphql'
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

const userQueryDocument = graphql(/* GraphQL */ `
  query user {
    user {
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
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ email, password }: Props) =>
      req(document, {
        email,
        password,
      }),

    onSuccess(data) {
      router.push('/books')
      queryClient.setQueryData(['user'], () => data)
    },
  })
}

function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => req(logoutMutationDocument),

    onSuccess(_data) {
      router.push('/')

      queryClient.invalidateQueries(['user'])
    },
  })
}

function useEmail() {
  const result = useQuery<{ user: User }, Error>({
    queryKey: ['user'],
    queryFn: async () => req(userQueryDocument),
  })

  return result?.data?.user?.email ?? null
}

export { useAuth, useLogout, useEmail }
