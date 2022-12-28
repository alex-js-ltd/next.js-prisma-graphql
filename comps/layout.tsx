/** @jsxImportSource @emotion/react */
import { Fragment, ReactElement } from 'react'

import { Button, StyledLink } from 'comps/lib'
import * as mq from 'styles/media-queries'
import * as colors from 'styles/colors'

import { useLogout, useUser } from 'utils/client.auth'

const Layout = ({ children }: { children: ReactElement }) => {
  const logout = useLogout()
  const { user } = useUser()
  return (
    <Fragment>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        {user?.email}
        <Button
          variant="secondary"
          css={{ marginLeft: '10px' }}
          onClick={() => logout.mutateAsync()}
        >
          Logout
        </Button>
      </div>
      <div
        css={{
          margin: '0 auto',
          padding: '4em 2em',
          maxWidth: '840px',
          width: '100%',
          display: 'grid',
          gridGap: '1em',
          gridTemplateColumns: '1fr 3fr',
          [mq.small]: {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto',
            width: '100%',
          },
        }}
      >
        <div css={{ position: 'relative' }}>
          <Nav />
        </div>
        <main css={{ width: '100%' }}>{children}</main>
      </div>
    </Fragment>
  )
}

export default Layout

const Nav = () => (
  <nav
    css={{
      position: 'sticky',
      top: '4px',
      padding: '1em 1.5em',
      border: `1px solid ${colors.gray10}`,
      borderRadius: '3px',
      [mq.small]: {
        position: 'static',
        top: 'auto',
      },
    }}
  >
    <ul
      css={{
        listStyle: 'none',
        padding: '0',
      }}
    >
      <li>
        <StyledLink href="/reading-list">Reading List</StyledLink>
      </li>
      <li>
        <StyledLink href="/finished">Finished Books</StyledLink>
      </li>
      <li>
        <StyledLink href="/books">Discover</StyledLink>
      </li>
    </ul>
  </nav>
)
