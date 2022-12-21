import React from 'react'
import type { GetServerSideProps } from 'next'
import { validateToken } from 'lib/validate'
import { useBooks } from 'lib/get-books'

const Books = () => {
  const { data } = useBooks()

  return <div>Books</div>
}

export default Books

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookie = req.cookies.ACCESS_TOKEN || ''

  try {
    const user = validateToken(cookie)
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return {
    props: {},
  }
}
