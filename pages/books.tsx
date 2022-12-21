import type { ReactElement } from 'react'
import Layout from 'comps/layout'
import type { NextPageWithLayout } from './_app'
import { useBooks } from 'lib/get-books'

const Page: NextPageWithLayout = () => {
  const { data } = useBooks()
  console.log(data)
  return <p></p>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
