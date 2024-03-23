import { Gideon_Roman } from "next/font/google";
import MetaData from "../MetaData/index";
import Cart from '@/components/Cart';
import Navbar from '@/components/Navbar';
import Search from '../Search';
import { useEcommerceContext } from "../../lib/context/context";
import Footer from "../Footer";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import commerce from "../../lib/commerce"

const font = Gideon_Roman({ subsets: ["latin"], weight: "400" });

const Layout = ({ title, description, keywords, children }) => {

    const {
        isSearchOpened,
        setIsSearchOpened,
        isCartOpened,
        setIsCartOpened
    } = useEcommerceContext()

    const session = useSession()

    useEffect(() => {
        console.log("<-NextAuth Auth->", session.status);
        // console.log("commerceJS AUTH", commerce.customer.isLoggedIn());
    }, [session])

    return (
        <>
            <MetaData
                description={description}
                keywords={keywords}
                title={title}
            />
            <main className={`flex flex-col w-full min-h-screen ${font.className}`}>
                <Cart isOpen={isCartOpened} setIsOpen={setIsCartOpened} />
                <Search isOpen={isSearchOpened} setIsOpen={setIsSearchOpened} />
                <div className="bg-gray-50 w-full p-2 text-center">
                    <p className='text-gray-600 text-xs font-medium'>
                        Free Expfress Shipping | Cash on delivery is available
                    </p>
                </div>
                <Navbar setIsCartOpened={setIsCartOpened} setIsSearchOpened={setIsSearchOpened} />
                <div className="flex-1 w-full">
                    {children}
                </div>
                <Footer />
            </main>
        </>
    )
}

export default Layout