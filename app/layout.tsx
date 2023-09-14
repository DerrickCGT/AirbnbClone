import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
// import Modal from './components/modals/Modal'
import RegisterModal from './components/modals/RegisterModal'
import ClientOnly from './components/ClientOnly'
import ToasterProvider from './providers/ToasterProvider'


const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
                
        {children}
        </body>
    </html>
  )
}
