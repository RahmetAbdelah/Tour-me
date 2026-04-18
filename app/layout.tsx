import { Outfit } from 'next/font/google'
import "./globals.css"

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: "TourMe Ethiopia",
  description: "Experience Ethiopia like a local",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} font-sans`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
