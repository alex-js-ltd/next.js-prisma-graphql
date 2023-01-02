/** @jsxImportSource @emotion/react */

import Link from 'next/link'
import * as mq from 'styles/media-queries'
import * as colors from 'styles/colors'
import { StatusButtons } from './status-buttons'
import { Rating } from './rating'
import type { ListItem, Book } from '@prisma/client'

type BookRowProps<T> = {
  book: T
}

const BookRow = <T extends Book & ListItem>({ book }: BookRowProps<T>) => {
  const { title, author, coverImageUrl, synopsis, publisher, id } = book

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
      }}
    >
      <Link
        href={`/book/${id}`}
        css={{
          minHeight: 270,
          flexGrow: 2,
          display: 'grid',
          gridTemplateColumns: '140px 1fr',
          gridGap: 20,
          border: `1px solid ${colors.gray20}`,
          color: colors.text,
          padding: '1.25em',
          borderRadius: '3px',
          ':hover,:focus': {
            textDecoration: 'none',
            boxShadow: '0 5px 15px -5px rgba(0,0,0,.08)',
            color: 'inherit',
          },
        }}
      >
        <div
          css={{
            width: 140,
            [mq.small]: {
              width: 100,
            },
          }}
        >
          <img
            src={
              "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='400px' height='600px' viewBox='0 0 400 600' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EBook Placeholder%3C/title%3E%3Cdefs%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='linearGradient-1'%3E%3Cstop stop-color='%23E6E7EE' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%23E2E4EC' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Group-10'%3E%3Cg id='Group-9'%3E%3Cg id='Group-8'%3E%3Cpath d='M3,0 L397,0 C398.656854,-3.04359188e-16 400,1.34314575 400,3 L400,584 L400,584 L0,584 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 Z' id='Combined-Shape' fill='%23F1F2F7'%3E%3C/path%3E%3Cpath d='M381.643484,598.685213 L400,584 L400,584 L0,584 L18.3565161,598.685213 C19.4203944,599.536315 20.7422574,600 22.1046864,600 L377.895314,600 C379.257743,600 380.579606,599.536315 381.643484,598.685213 Z' id='Path-9' fill='url(%23linearGradient-1)'%3E%3C/path%3E%3C/g%3E%3Crect id='Rectangle' fill='%23E2E4EB' opacity='0.5' x='50' y='154' width='300' height='42' rx='5'%3E%3C/rect%3E%3Crect id='Rectangle' fill='%23E2E4EB' opacity='0.5' x='50' y='214' width='300' height='42' rx='5'%3E%3C/rect%3E%3Crect id='Rectangle' fill='%23E2E4EB' opacity='0.5' x='50' y='515' width='300' height='26' rx='5'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
            }
            alt={`${title} book cover`}
            css={{ maxHeight: '100%', width: '100%' }}
          />
        </div>
        <div css={{ flex: 1 }}>
          <div css={{ display: 'flex', justifyContent: 'space-between' }}>
            <div css={{ flex: 1 }}>
              <h2
                css={{
                  fontSize: '1.25em',
                  margin: '0',
                  color: colors.indigo,
                }}
              >
                {title}
              </h2>
              {isFinished(book) ? <Rating listItem={book} /> : null}
            </div>
            <div css={{ marginLeft: 10 }}>
              <div
                css={{
                  marginTop: '0.4em',
                  fontStyle: 'italic',
                  fontSize: '0.85em',
                }}
              >
                {author}
              </div>
              <small>{publisher}</small>
            </div>
          </div>
          <small css={{ whiteSpace: 'break-spaces', display: 'block' }}>
            {synopsis.substring(0, 500)}...
          </small>
        </div>
      </Link>
      <div
        css={{
          marginLeft: '20px',
          position: 'absolute',
          right: -20,
          color: colors.gray80,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: '100%',
        }}
      >
        <StatusButtons book={book} />
      </div>
    </div>
  )
}

export { BookRow }

function isFinished(valueToTest: any) {
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    'finishDate' in valueToTest &&
    typeof valueToTest['finishDate'] === 'string'
  )
}
