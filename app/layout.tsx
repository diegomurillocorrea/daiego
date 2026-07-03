import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LocaleProvider } from '@/components/i18n/locale-provider'
import './globals.css'

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: 'DAIEGO — AI Business Operating System',
  description:
    'DAIEGO builds modular software, automation tools and AI-powered platforms to manage sales, inventory, employees, payments, subscriptions and digital operations.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <LocaleProvider>{children}</LocaleProvider>
        <Analytics />
      </body>
    </html>
  )
}
