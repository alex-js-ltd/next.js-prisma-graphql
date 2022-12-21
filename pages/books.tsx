import React from 'react'
import type { GetServerSideProps } from 'next'
import { validateToken } from 'lib/validate-token'
import { useBooks } from 'lib/get-books'

const Books = ({ user }: any) => {
  const { data } = useBooks()
  console.log(user)
  console.log(data)
  return <div>Books</div>
}

export default Books

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookie = req.cookies.ACCESS_TOKEN || ''

  let user
  try {
    user = validateToken(cookie)
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return {
    props: { user },
  }
}
