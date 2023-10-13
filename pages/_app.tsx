import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'
import InvoiceProvider from '@/state-management/context/context'
import UserProvider from '@/state-management/context/user'
import ProjectProvider from '@/state-management/context/project'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <InvoiceProvider>
      <UserProvider>
        <ProjectProvider>
          <ChakraProvider>
            <Component {...pageProps} />
            <Toaster />
          </ChakraProvider>
        </ProjectProvider>
      </UserProvider>
    </InvoiceProvider>
  )
}
