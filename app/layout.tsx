
import Navbar from './(components)/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import myUser from './actions/getUser'
import getBasketItems from './actions/getBasketItems'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CoL',
  description: 'Find your teacher!',
}

export const dynamic = 'force-dynamic'
export const runtime = 'edge';
export const preferredRegion = 'bom1';
export const revalidate = 1200;

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