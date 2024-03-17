import React, { useState } from 'react'
import { Inter } from "next/font/google";
import MetaData from "../MetaData/index"
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ title, description, keywords, children }) => {
    const [isCartOpened, setIsCartOpened] = useState(false)
    return (
        <>
            <MetaData
                description={description}
                keywords={keywords}
                title={title}
            />
            <main className={`min-h-screen ${inter.className}`}>
                <Cart isOpen={isCartOpened} setIsOpen={setIsCartOpened} />
                <Navbar isCartOpened={isCartOpened} setIsCartOpened={setIsCartOpened} />
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout