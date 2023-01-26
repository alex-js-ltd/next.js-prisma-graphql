import { ReactElement, ReactNode, useState } from 'react'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { build } from '@jackfranklin/test-data-bot'

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const wrapper = ({
  children,
}: {
  children: ReactNode & {
    props: any
  }
}) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={children?.props.dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  )
}

const render = (ui: ReactElement, { ...options } = {}) => {
  return rtlRender(ui, { wrapper: wrapper, ...options })
}

export * from '@testing-library/react'
// override React Testing Library's render with our own
export { render, build, userEvent }
