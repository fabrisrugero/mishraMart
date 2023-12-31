import Chat from '@/components/Chat'
import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import Providers from '@/components/Providers'
import ConvexClientProvider from "../ConvexClientProvider";
import ToastProvider from '../providers/ToastProvider'
import Navbar from '@/components/Navbar'

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ConvexClientProvider>
        <Providers>
          <body className={font.className}>
            <ToastProvider />
            <Navbar />
            <Chat />
            {children}
          </body>
        </Providers>
      </ConvexClientProvider>
    </html>
  )
}
