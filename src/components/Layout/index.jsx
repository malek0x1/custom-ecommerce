import { Gideon_Roman } from "next/font/google";
import MetaData from "../MetaData/index";
import { useEcommerceContext } from "../../lib/context/context";
import Footer from "../Footer";
import dynamic from "next/dynamic";
import AnnouncementBar from "../AnnouncementBar";
import Cart from "../Cart";

const font = Gideon_Roman({ subsets: ["latin"], weight: "400" });
const Search = dynamic(() => import("@/components/Search"));
const Navbar = dynamic(() => import("@/components/Navbar"));

const Layout = ({ title, description, keywords, children, isFooter = true, isHeader = true }) => {

    const {
        isSearchOpened,
        setIsSearchOpened,
        isCartOpened,
        setIsCartOpened
    } = useEcommerceContext()

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

                {isHeader && <AnnouncementBar message="Free Expfress Shipping | Cash on delivery is available" />}


                {isHeader && (

                    <Navbar setIsCartOpened={setIsCartOpened} setIsSearchOpened={setIsSearchOpened} />
                )}
                <div className="flex-1 w-full">
                    {children}
                </div>
                {isFooter && <Footer />}
            </main>
        </>
    )
}

export default Layout