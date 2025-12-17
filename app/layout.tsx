import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hard Money Marketplace',
  description: 'Connect borrowers with lenders for fix-and-flip deals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
