import type { ReactElement } from 'react'
import type { ListItem } from 'generated/graphql'
import { StyledLink } from 'comps/lib'
import Layout from 'comps/layout'
import { ListItemList } from 'comps/list-item-list'
import { useListItems } from 'utils/list-items.client'

const ReadingList = () => {
  const list = useListItems()

  const filter = list.filter((li: ListItem) => li.finishDate === null)

  return <ListItemList list={filter} />
}

ReadingList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default ReadingList
