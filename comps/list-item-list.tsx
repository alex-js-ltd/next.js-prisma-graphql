import { ReactNode } from 'react'
import { BookListUL } from './lib'
import { BookRow } from './book-row'

function ListItemList({
  noListItems,
  list,
}: {
  noListItems: ReactNode
  list: any[]
}) {
  if (!list?.length) {
    return (
      <div css={{ marginTop: '1em', fontSize: '1.2em' }}>{noListItems}</div>
    )
  }

  return (
    <BookListUL>
      {list?.map((listItem: any) => (
        <li key={listItem.id}>
          <BookRow book={listItem} />
        </li>
      ))}
    </BookListUL>
  )
}

export { ListItemList }
