
import Navbar from './(components)/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import myUser from './actions/getUser'
import getBasketItems from './actions/getBasketItems'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Center of Learning Excellence',
  description: 'Find your teacher!',
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
    const myCurrentUser = await myUser();
    const basketItems = await getBasketItems();
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar
          basketItems={basketItems}
          myUser={myCurrentUser}
        />
        {children}
      </body>
    </html>
  )
}