import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { Header } from '@/components/header/header.component';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
        <Link className='enterPage' href="/tablero">Ingresar</Link>
        {children}
      </body>
    </html>
  )
}
