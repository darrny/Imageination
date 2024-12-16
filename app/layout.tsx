import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Imageination',
  description: 'Generate amazing images from text descriptions',
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