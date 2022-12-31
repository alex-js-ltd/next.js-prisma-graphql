import { ReactNode } from 'react'
import { BookListUL } from './lib'
import { BookRow } from './book-row'
import type { ListItem } from '@prisma/client'

function ListItemList({
  noListItems,
  list,
}: {
  noListItems: ReactNode
  list: ListItem[]
}) {
  if (!list?.length) {
    return (
      <div css={{ marginTop: '1em', fontSize: '1.2em' }}>{noListItems}</div>
    )
  }

  console.log(list)

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
