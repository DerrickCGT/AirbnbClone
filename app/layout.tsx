import './globals.css'

import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
// import Modal from './components/modals/Modal'
import RentModal from './components/modals/RentModal'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import ClientOnly from './components/ClientOnly'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUsers'


const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
                
        {children}
        </body>
    </html>
  )
}
