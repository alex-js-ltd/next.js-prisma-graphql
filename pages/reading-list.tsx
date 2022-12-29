import { StyledLink } from 'comps/lib'
import { ListItemList } from 'comps/list-item-list'
import { useListItems } from 'utils/list-items.client'

const ReadingList = () => {
  const list = useListItems()

  const filter = list.filter((li: any) => li.finishDate === null)

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
export default ReadingList
