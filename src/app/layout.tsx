'use client'

import { RootLayout } from '@/components/RootLayout'
import '@/styles/tailwind.css'
import { Providers } from './providers'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <Providers>
          <RootLayout>{children}</RootLayout>
        </Providers>
      </body>
    </html>
  )
}
