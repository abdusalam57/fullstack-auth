import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { RootProvider } from './providers'
import { ThemeToggle } from '@/features/theme-toggle'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['cyrillic'],
})

export const metadata: Metadata = {
  title: 'Главная страница',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
    >
      <body className={`${nunito.variable} antialiased`}>
        <RootProvider>
          <div className="relative flex min-h-screen">
            <ThemeToggle />
            <div className="flex h-screen w-full items-center justify-center px-4">
              {children}
            </div>
          </div>
        </RootProvider>
      </body>
    </html>
  )
}
