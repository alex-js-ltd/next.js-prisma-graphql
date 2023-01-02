/** @jsxImportSource @emotion/react */
import '@reach/tooltip/styles.css'
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
import {
  useCreateListItem,
  useListItem,
  useRemoveListItem,
  useUpdateListItem,
} from 'utils/list-items.client'
import type { Book, ListItem } from '@prisma/client'

type TooolTipProps = {
  label?: string
  highlight?: string
  onClick: Function
  icon: ReactElement
}

function TooltipButton({
  label,
  highlight,
  onClick,
  icon,
  ...rest
}: TooolTipProps) {
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

type StatusProps<T> = {
  book: T
}

const StatusButtons = <T extends Book | ListItem>({ book }: StatusProps<T>) => {
  const listItem = useListItem(book)
  const create = useCreateListItem(book)
  const remove = useRemoveListItem()
  const update = useUpdateListItem()

  return (
    <Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Mark as unread"
            highlight={colors.yellow}
            onClick={() =>
              update.mutateAsync({ ...listItem, finishDate: null })
            }
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            onClick={() =>
              update.mutateAsync({
                ...listItem,
                finishDate: new Date(Date.now()).toISOString(),
              })
            }
            icon={<FaCheckCircle />}
          />
        )
      ) : null}

      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={() => remove.mutateAsync(listItem?.id)}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={() => create.mutateAsync()}
          icon={<FaPlusCircle />}
        />
      )}
    </Fragment>
  )
}

export { StatusButtons }
