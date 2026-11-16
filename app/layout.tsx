import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { OrientationLock } from '@/components/app/orientation-lock'
import './globals.css'

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
    <html lang="th" className="bg-background">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Trirong:wght@300;400;600&display=swap"
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <OrientationLock />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
