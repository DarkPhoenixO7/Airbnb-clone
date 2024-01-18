import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Components/Navbar/Nvabar'
import RegisterModal from './Components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './Components/modals/LoginModal'
import getCurrerntUser from './actions/getCurrentUser'
import RentModal from './Components/modals/RentModal'
import SearchModal from './Components/modals/SearchModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrerntUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <SearchModal />
        <LoginModal />
        <RentModal />
        <RegisterModal />

        <Navbar currentUser ={currentUser} />
        <div className='pb-20 pt-28'>
         {children}
        </div>
      </body>
    </html>
  )
}
