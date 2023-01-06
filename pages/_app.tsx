import 'bootstrap/dist/css/bootstrap-reboot.css'
import 'styles/global.css'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import { useState } from 'react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient(config))

  const getLayout = Component.getLayout ?? (page => page)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {getLayout(<Component {...pageProps} />)}
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

const config = {
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
  },
}
