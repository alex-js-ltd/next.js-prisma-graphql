import type { NextPageWithLayout } from './_app'
import type { ReactElement } from 'react'
import type { ListItem } from 'generated/graphql'
import Layout from 'comps/layout'
import { ListItemList } from 'comps/list-item-list'
import { useListItems } from 'utils/list-items.client'

const ReadingList: NextPageWithLayout = () => {
  const list = useListItems()

  const filter = list.filter((li: ListItem) => !li.finishDate)

  return <ListItemList list={filter} />
}

ReadingList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default ReadingList
