import type { NextPage } from 'next'
import { useBooks } from 'lib/get-books'

const Books: NextPage = () => {
  const { data } = useBooks()

  console.log(data)
  return <div>Books</div>
}

export default Books
