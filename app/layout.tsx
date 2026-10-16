import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_Thai } from 'next/font/google'
import './globals.css'

const notoThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-thai',
})

export const metadata: Metadata = {
  title: 'แอปบริการ',
  description: 'Mobile service app UI with menu, announcements and bottom navigation',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/app-icon/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/app-icon/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/app-icon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  appleWebApp: {
    capable: true,
    title: 'แอปบริการ',
    statusBarStyle: 'black-translucent',
  },
}

export const viewport: Viewport = {
  themeColor: '#2b2f8f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" className={`${notoThai.variable} bg-white`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
