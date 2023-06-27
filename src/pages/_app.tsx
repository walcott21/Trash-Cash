import { AuthProvider } from '@/hooks/useAuth'
import { DrawerContextProvider } from '@/hooks/useDrawer'
import { SnackbarContextProvider } from '@/hooks/useSnackbar'
import '@/styles/globals.css'
import { theme } from '@/themes'

import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarContextProvider>
      <AuthProvider>
        <DrawerContextProvider>
          <ThemeProvider theme={theme}>
            <Head>
              <title>TrashCash</title>
            </Head>
              <Component {...pageProps} />     
          </ThemeProvider>
        </DrawerContextProvider>
      </AuthProvider>
    </SnackbarContextProvider>
  )
}
