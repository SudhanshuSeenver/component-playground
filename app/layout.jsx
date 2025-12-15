import './globals.scss'

export const metadata = {
  title: 'Component Playground',
  description: 'Component playground with Next.js 15 and Tailwind CSS 4',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
