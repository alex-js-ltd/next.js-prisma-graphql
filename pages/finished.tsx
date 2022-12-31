import type { NextPageWithLayout } from './_app'
import type { ReactElement } from 'react'
import type { ListItem } from 'generated/graphql'
import Layout from 'comps/layout'
import { ListItemList } from 'comps/list-item-list'
import { useListItems } from 'utils/list-items.client'

const Finished: NextPageWithLayout = () => {
  const list = useListItems()

  const filter = list.filter((li: ListItem) => Boolean(li.finishDate))

  return <ListItemList list={filter} />
}

Finished.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default Finished
