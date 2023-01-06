import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import type { FormEvent } from 'react'
import type { Book } from '@prisma/client'
import * as colors from 'styles/colors'
import Layout from 'comps/layout'
import { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { Input, BookListUL, Spinner } from 'comps/lib'
import { useBooks } from 'utils/books.client'
import { BookRow } from 'comps/book-row'
import { prisma } from 'utils/prisma.server'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from 'utils/session.server'
import { getListItems } from 'utils/query.server'

const Page: NextPageWithLayout = () => {
  const [query, setQuery] = useState<string>('')

  const { books, error, isLoading, isError } = useBooks(query)
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      search: HTMLInputElement
    }

    setQuery(formElements.search.value)
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSearchSubmit}>
          <Input
            placeholder="Search books..."
            id="search"
            css={{ width: '100%' }}
          />

          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes aria-label="error" css={{ color: colors.danger }} />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </form>

        {isError ? (
          <div css={{ color: colors.danger }}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null}

        <BookListUL css={{ marginTop: 20 }}>
          {books?.map((book: Book) => (
            <li key={book.id} aria-label={book.title}>
              <BookRow key={book.id} book={book} />
            </li>
          ))}
        </BookListUL>
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const id = Number(req.session.user?.id)

  if (id === undefined) {
    res.setHeader('location', '/')
    res.statusCode = 302
    res.end()
  }

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['bookSearch', { query: '' }],
    queryFn: () => fetchBooks(id),
  })

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  }
},
sessionOptions)

export default Page

const fetchBooks = async (id: number) => {
  const books = await prisma.book.findMany({ skip: 0, take: 10 })

  const listItems = await getListItems(id, prisma)

  const bookIds = listItems?.map(li => li.bookId)

  return { books: books?.filter(b => !bookIds?.includes(b.id)) ?? [] }
}
