import type { ReactElement } from 'react'
import type { ListItem } from 'generated/graphql'
import { StyledLink } from 'comps/lib'
import Layout from 'comps/layout'
import { ListItemList } from 'comps/list-item-list'
import { useListItems } from 'utils/list-items.client'

const ReadingList = () => {
  const list = useListItems()

  const filter = list.filter((li: ListItem) => li.finishDate === null)

  return (
    <ListItemList
      list={filter}
      noListItems={
        <p>
          Hey there! Welcome to your bookshelf reading list. Get started by
          heading over to{' '}
          <StyledLink href="/books">the Discover page</StyledLink> to add books
          to your list.
        </p>
      }
    />
  )
}

ReadingList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default ReadingList
