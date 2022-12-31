import { BookListUL } from './lib'
import { BookRow } from './book-row'
import type { ListItem } from '@prisma/client'

function ListItemList({ list }: { list: ListItem[] }) {
  return (
    <BookListUL>
      {list?.map(listItem => (
        <li key={listItem.id}>
          <BookRow<ListItem> book={listItem} />
        </li>
      ))}
    </BookListUL>
  )
}

export { ListItemList }
