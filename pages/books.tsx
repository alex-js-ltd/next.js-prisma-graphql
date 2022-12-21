import React from 'react'
import type { GetServerSideProps } from 'next'
import { validateToken } from 'lib/validate'

const Books = () => {
  return <div>Books</div>
}

export default Books

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookie = req.cookies.ACCESS_TOKEN || ''

  console.log(cookie)
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
