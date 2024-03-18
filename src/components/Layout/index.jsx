import React, { useState } from 'react'
import { Inter } from "next/font/google";
import MetaData from "../MetaData/index"
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import Navbar from '@/components/Navbar';
import Search from '../Search';

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ title, description, keywords, children }) => {
    const [isSearchOpened, setIsSearchOpened] = useState(false)
    const [isCartOpened, setIsCartOpened] = useState(false)
    return (
        <>
            <MetaData
                description={description}
                keywords={keywords}
                title={title}
            />
            <main className={`flex flex-col min-h-screen ${inter.className}`}>
                <Cart isOpen={isCartOpened} setIsOpen={setIsCartOpened} />
                <Search isOpen={isSearchOpened} setIsOpen={setIsSearchOpened} />
                <Navbar setIsCartOpened={setIsCartOpened} setIsSearchOpened={setIsSearchOpened} />
                <div className="flex-1">
                    {children}
                </div>
                <Footer />
            </main>
        </>
    )
}

export default Layout