import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import type { FormEvent } from 'react'
import Layout from 'comps/layout'
import { useState } from 'react'

import { useBooks } from 'lib/get-books'

const Page: NextPageWithLayout = () => {
  const [query, setQuery] = useState<string>('')
  const [queried, setQueried] = useState<boolean>(false)
  const { data: books, error, isLoading, isError, isSuccess } = useBooks()
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      search: HTMLInputElement
    }
    setQueried(true)
    setQuery(formElements.search.value)
  }

  return (
    <div
      css={{ maxWidth: 800, margin: 'auto', width: '90vw', padding: '0px 0' }}
    >
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
        {books.map((book: Book) => (
          <li key={book.objectID} aria-label={book.title}>
            <BookRow<Book> key={book.objectID} book={book} />
          </li>
        ))}
      </BookListUL>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
