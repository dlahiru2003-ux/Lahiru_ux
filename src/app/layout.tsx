import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DLahiru_',
  description: 'Full-stack engineer & creative technologist',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
