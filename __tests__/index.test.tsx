import {
  render,
  screen,
  waitFor,
  build,
  waitForElementToBeRemoved,
  userEvent,
} from 'mocks/test-utils'

import Books from 'pages/books'
import { books } from 'mocks/mock-data'

test('book titles from mock should appear in dom', async () => {
  render(<Books />)

  await waitFor(() => {
    for (const book of books) {
      expect(screen.getByText(book.title)).toBeInTheDocument()
    }
  })
})

test('book authors from mock should appear in dom', async () => {
  render(<Books />)

  await waitFor(() => {
    for (const book of books) {
      expect(screen.getByText(book.author)).toBeInTheDocument()
    }
  })
})
