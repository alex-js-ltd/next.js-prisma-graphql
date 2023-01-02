import type { ReactElement } from 'react'
import type { NextPageWithLayout } from 'pages/_app'
import type { ListItem } from 'generated/graphql'
import Layout from 'comps/layout'
import { useRouter } from 'next/router'
import * as mq from 'styles/media-queries'
import * as colors from 'styles/colors'
import { StatusButtons } from 'comps/status-buttons'
import { Rating } from 'comps/rating'

import { useBook } from 'utils/books.client'
import { useListItem } from 'utils/list-items.client'
import { isFinished } from 'utils/type-guard.client'

import { FaRegCalendarAlt } from 'react-icons/fa'
import { Tooltip } from '@reach/tooltip'

const Book: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query

  const book = useBook(id)
  const listItem = useListItem(book)

  const { coverImageUrl, title, author, publisher, synopsis } = book

  return (
    <div>
      <div
        css={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gridGap: '2em',
          marginBottom: '1em',
          [mq.small]: {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <img
          src={coverImageUrl}
          alt={`${title} book cover`}
          css={{ width: '100%', maxWidth: '14rem' }}
        />
        <div>
          <div css={{ display: 'flex', position: 'relative' }}>
            <div css={{ flex: 1, justifyContent: 'space-between' }}>
              <h1>{title}</h1>
              <div>
                <i>{author}</i>
                <span css={{ marginRight: 6, marginLeft: 6 }}>|</span>
                <i>{publisher}</i>
              </div>
            </div>
            <div
              css={{
                right: 0,
                color: colors.gray80,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                minHeight: 100,
              }}
            >
              <StatusButtons book={book} />
            </div>
          </div>
          <div css={{ marginTop: 10, height: 46 }}>
            {isFinished(listItem) ? <Rating listItem={listItem} /> : null}
            {listItem ? <ListItemTimeframe listItem={listItem} /> : null}
          </div>
          <br />
          <p>{synopsis}</p>
        </div>
      </div>
      {/* {listItem ? <NotesTextarea listItem={listItem} /> : null} */}
    </div>
  )
}

Book.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Book

function ListItemTimeframe({ listItem }: { listItem: ListItem }) {
  const timeframeLabel = listItem.finishDate
    ? 'Start and finish date'
    : 'Start date'

  return (
    <Tooltip label={timeframeLabel}>
      <div aria-label={timeframeLabel} css={{ marginTop: 6 }}>
        <FaRegCalendarAlt css={{ marginTop: -2, marginRight: 5 }} />
        <span>
          {listItem.startDate ? listItem.startDate.substring(0, 10) : null}
          {listItem.finishDate
            ? `— ${listItem.finishDate.substring(0, 10)}`
            : null}
        </span>
      </div>
    </Tooltip>
  )
}
