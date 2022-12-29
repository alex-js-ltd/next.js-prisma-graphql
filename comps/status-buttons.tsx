/** @jsxImportSource @emotion/react */
import React, { ReactElement, Fragment } from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa'
import { Tooltip } from '@reach/tooltip'
import { useAsync } from 'utils/use-async.client'
import * as colors from 'styles/colors'
import { CircleButton, Spinner } from './lib'
import { useCreateListItem, useListItem } from 'utils/list-items.client'
import { useUser } from 'utils/auth.client'
import type { Book } from 'generated/graphql'

type Props = {
  label?: string
  highlight?: string
  onClick: Function
  icon: ReactElement
}

function TooltipButton({ label, highlight, onClick, icon, ...rest }: Props) {
  const { isLoading, isError, error, run } = useAsync()

  const handleClick = () => {
    run(onClick())
  }

  return (
    <Tooltip label={isError ? error?.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error?.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function StatusButtons({ book }: { book: Book }) {
  const { __typename, id, ...rest } = book
  const user = useUser()
  const listItem = useListItem(book)
  const create = useCreateListItem()

  console.log('listItem', listItem)

  return (
    <Fragment>
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          // onClick={() => remove.mutateAsync(listItem)}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={() =>
            create.mutateAsync({
              ...rest,
              userId: user?.id,
            })
          }
          icon={<FaPlusCircle />}
        />
      )}
    </Fragment>
  )
}

export { StatusButtons }
