import { useRouter } from 'next/router'

const Book = () => {
  const router = useRouter()
  const { id } = router.query
  return <div>Book {id}</div>
}

export default Book
