import { useState } from 'react';
import { Gideon_Roman } from "next/font/google";
import MetaData from "../MetaData/index";
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import Navbar from '@/components/Navbar';
import Search from '../Search';

const font = Gideon_Roman({ subsets: ["latin"], weight: "400" });
// const font = Lora({ subsets: ["latin"], weight: "400" });

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
            <main className={`flex flex-col min-h-screen ${font.className}`}>
                <Cart isOpen={isCartOpened} setIsOpen={setIsCartOpened} />
                <Search isOpen={isSearchOpened} setIsOpen={setIsSearchOpened} />
                <div className="bg-gray-50 w-full p-2 text-center">
                    <p className='text-gray-600 text-xs font-medium'>
                        Free Expfress Shipping | Cash on delivery is available
                    </p>
                </div>
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